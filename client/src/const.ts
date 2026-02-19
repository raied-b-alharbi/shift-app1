export const COOKIE_NAME = 'session';
export const AXIOS_TIMEOUT_MS = 30_000;
export const UNAUTHED_ERR_MSG = 'Please login (10001)';
export const NOT_ADMIN_ERR_MSG = 'You do not have required permission (10002)';

export const ATTENDANCE_STATUSES = {
  'P': 'حضور',
  'D/O': 'عطل',
  'A': 'غياب',
  'L': 'تأخير',
  'V': 'إجازة',
  'V/': 'مخالفة',
  'S': 'استبدال',
};

export const STATUS_COLORS = {
  'P': '#00B0F0',
  'D/O': '#FFC000',
  'A': '#EF4444',
  'L': '#F97316',
  'V': '#8B5CF6',
  'V/': '#EC4899',
  'S': '#06B6D4',
};
