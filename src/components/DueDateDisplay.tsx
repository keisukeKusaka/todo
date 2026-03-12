import { getDueDateStatus, formatDueDate } from '../utils/dateHelpers';

export function DueDateDisplay({ dueDate }: { dueDate?: string }) {
  const status = getDueDateStatus(dueDate);
  if (status === 'none') return null;
  const label = formatDueDate(dueDate);
  const cls = status === 'overdue' ? 'due-overdue' : status === 'today' || status === 'soon' ? 'due-today' : 'due-future';
  const icon = status === 'overdue' ? '⚠' : '📅';
  return <span className={cls}>{icon} {label}</span>;
}
