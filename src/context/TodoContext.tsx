import React, { createContext, useContext, useState, useMemo } from 'react';
import type { Todo, FilterState, Priority } from '../types/todo';
import { useTodos } from '../hooks/useTodos';
import { applyFilters } from '../utils/filters';

type Action =
  | { type: 'ADD'; payload: { title: string; description?: string; priority: Priority; dueDate?: string } }
  | { type: 'UPDATE'; payload: Partial<Todo> & { id: string } }
  | { type: 'DELETE'; payload: string }
  | { type: 'TOGGLE'; payload: string }
  | { type: 'CLEAR_COMPLETED' };

interface ContextValue {
  todos: Todo[];
  filteredTodos: Todo[];
  filter: FilterState;
  setFilter: (patch: Partial<FilterState>) => void;
  dispatch: React.Dispatch<Action>;
  stats: { total: number; active: number; completed: number; overdue: number };
}

const Ctx = createContext<ContextValue>(null!);

const DEFAULT_FILTER: FilterState = {
  status: 'all',
  priority: 'all',
  sortBy: 'createdAt',
  sortDir: 'desc',
  searchQuery: '',
};

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const { todos, dispatch } = useTodos();
  const [filter, setFilterState] = useState<FilterState>(DEFAULT_FILTER);

  const setFilter = (patch: Partial<FilterState>) =>
    setFilterState(prev => ({ ...prev, ...patch }));

  const filteredTodos = useMemo(() => applyFilters(todos, filter), [todos, filter]);

  const stats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return {
      total: todos.length,
      active: todos.filter(t => t.status === 'active').length,
      completed: todos.filter(t => t.status === 'completed').length,
      overdue: todos.filter(t => t.status === 'active' && t.dueDate && t.dueDate < today).length,
    };
  }, [todos]);

  return (
    <Ctx.Provider value={{ todos, filteredTodos, filter, setFilter, dispatch, stats }}>
      {children}
    </Ctx.Provider>
  );
}

export const useTodoContext = () => useContext(Ctx);
