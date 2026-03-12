import type { Todo, FilterState } from '../types/todo';

const PRIORITY_ORDER = { low: 1, medium: 2, high: 3 };

export function applyFilters(todos: Todo[], filter: FilterState): Todo[] {
  let result = todos;

  if (filter.status !== 'all') {
    result = result.filter(t => t.status === filter.status);
  }
  if (filter.priority !== 'all') {
    result = result.filter(t => t.priority === filter.priority);
  }
  if (filter.searchQuery.trim()) {
    const q = filter.searchQuery.toLowerCase();
    result = result.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.description?.toLowerCase().includes(q)
    );
  }

  result = [...result].sort((a, b) => {
    let cmp = 0;
    switch (filter.sortBy) {
      case 'priority':
        cmp = PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority];
        break;
      case 'dueDate':
        if (!a.dueDate && !b.dueDate) cmp = 0;
        else if (!a.dueDate) cmp = 1;
        else if (!b.dueDate) cmp = -1;
        else cmp = a.dueDate.localeCompare(b.dueDate);
        break;
      case 'title':
        cmp = a.title.localeCompare(b.title);
        break;
      case 'createdAt':
      default:
        cmp = b.createdAt.localeCompare(a.createdAt);
        break;
    }
    return filter.sortDir === 'desc' ? -cmp : cmp;
  });

  return result;
}
