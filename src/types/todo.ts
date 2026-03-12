export type Priority = 'low' | 'medium' | 'high';
export type Status = 'active' | 'completed';
export type FilterStatus = 'all' | 'active' | 'completed';
export type SortField = 'createdAt' | 'dueDate' | 'priority' | 'title';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface FilterState {
  status: FilterStatus;
  priority: Priority | 'all';
  sortBy: SortField;
  sortDir: 'asc' | 'desc';
  searchQuery: string;
}
