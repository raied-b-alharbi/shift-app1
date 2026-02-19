export interface Employee {
  id: number;
  name: string;
  role: string;
}

export interface AttendanceRecord {
  id: number;
  employeeId: number;
  dayIndex: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuditLog {
  id: number;
  employeeId: number;
  dayIndex: number;
  oldStatus: string | null;
  newStatus: string;
  modifiedBy: string;
  createdAt: Date;
}

export interface User {
  id: number;
  openId: string;
  name: string | null;
  email: string | null;
  role: 'user' | 'admin';
}

export interface SyncStatus {
  status: 'idle' | 'syncing' | 'success' | 'error';
  message?: string;
  timestamp?: Date;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'alert' | 'info';
  title: string;
  message: string;
  category?: string;
  duration?: number;
  actionLabel?: string;
  actionCallback?: () => void;
}
