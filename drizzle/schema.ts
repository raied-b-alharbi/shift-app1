import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

// جدول الموظفين
export const employees = mysqlTable("employees", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  role: varchar("role", { length: 100 }).notNull(), // مشرف أو فرد
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// جدول حالات الحضور
export const attendanceRecords = mysqlTable("attendanceRecords", {
  id: int("id").autoincrement().primaryKey(),
  employeeId: int("employeeId").notNull(),
  dayIndex: int("dayIndex").notNull(), // 0-29
  status: varchar("status", { length: 20 }).notNull(), // P, D/O, A, etc.
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// جدول سجل التعديلات
export const auditLog = mysqlTable("auditLog", {
  id: int("id").autoincrement().primaryKey(),
  employeeId: int("employeeId").notNull(),
  dayIndex: int("dayIndex").notNull(),
  oldStatus: varchar("oldStatus", { length: 20 }),
  newStatus: varchar("newStatus", { length: 20 }).notNull(),
  modifiedBy: varchar("modifiedBy", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// جدول المستخدمين
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type Employee = typeof employees.<LaTex>$inferSelect;
export type AttendanceRecord = typeof attendanceRecords.$</LaTex>inferSelect;
export type AuditLog = typeof auditLog.<LaTex>$inferSelect;
export type User = typeof users.$</LaTex>inferSelect;
