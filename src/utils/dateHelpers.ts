export type DueDateStatus = 'none' | 'overdue' | 'today' | 'soon' | 'future';

function toDateOnly(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function getDueDateStatus(dueDate?: string): DueDateStatus {
  if (!dueDate) return 'none';
  const today = toDateOnly(new Date());
  if (dueDate < today) return 'overdue';
  if (dueDate === today) return 'today';
  const diff = Math.ceil((new Date(dueDate + 'T00:00:00').getTime() - new Date(today + 'T00:00:00').getTime()) / 86400000);
  if (diff <= 3) return 'soon';
  return 'future';
}

export function formatDueDate(dueDate?: string): string {
  if (!dueDate) return '';
  const today = toDateOnly(new Date());
  if (dueDate === today) return 'Today';
  const tomorrow = toDateOnly(new Date(Date.now() + 86400000));
  if (dueDate === tomorrow) return 'Tomorrow';
  const diff = Math.ceil((new Date(dueDate + 'T00:00:00').getTime() - new Date(today + 'T00:00:00').getTime()) / 86400000);
  if (diff < 0) return `${Math.abs(diff)}d overdue`;
  if (diff <= 7) return `In ${diff}d`;
  return new Date(dueDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
