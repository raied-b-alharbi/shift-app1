import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { employees, attendanceRecords, auditLog, users, InsertUser } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// دوال الموظفين
export async function getAllEmployees() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(employees);
}

export async function getEmployeeById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(employees).where(eq(employees.id, id)).limit(1);
  return result[0] || null;
}

// دوال الحضور
export async function getAttendanceRecords(employeeId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(attendanceRecords).where(eq(attendanceRecords.employeeId, employeeId));
}

export async function updateAttendanceRecord(employeeId: number, dayIndex: number, status: string) {
  const db = await getDb();
  if (!db) return null;
  
  const existing = await db
    .select()
    .from(attendanceRecords)
    .where(eq(attendanceRecords.employeeId, employeeId) && eq(attendanceRecords.dayIndex, dayIndex))
    .limit(1);

  if (existing.length > 0) {
    return db
      .update(attendanceRecords)
      .set({ status, updatedAt: new Date() })
      .where(eq(attendanceRecords.employeeId, employeeId) && eq(attendanceRecords.dayIndex, dayIndex));
  } else {
    return db.insert(attendanceRecords).values({ employeeId, dayIndex, status });
  }
}

// دوال سجل التعديلات
export async function logAudit(employeeId: number, dayIndex: number, oldStatus: string | null, newStatus: string, modifiedBy: string) {
  const db = await getDb();
  if (!db) return null;
  return db.insert(auditLog).values({ employeeId, dayIndex, oldStatus, newStatus, modifiedBy });
}

export async function getAuditLogs() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(auditLog);
}

// دوال المستخدمين
export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}
