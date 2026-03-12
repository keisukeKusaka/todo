import type { Priority } from '../types/todo';

const LABELS: Record<Priority, string> = { low: 'Low', medium: 'Med', high: 'High' };

export function PriorityBadge({ priority }: { priority: Priority }) {
  return <span className={`badge badge-${priority}`}>{LABELS[priority]}</span>;
}
