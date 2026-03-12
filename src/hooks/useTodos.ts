import { useReducer, useEffect, useRef } from 'react';
import type { Todo, Priority } from '../types/todo';
import { loadTodos, saveTodos } from '../utils/storage';

type Action =
  | { type: 'ADD'; payload: { title: string; description?: string; priority: Priority; dueDate?: string } }
  | { type: 'UPDATE'; payload: Partial<Todo> & { id: string } }
  | { type: 'DELETE'; payload: string }
  | { type: 'TOGGLE'; payload: string }
  | { type: 'CLEAR_COMPLETED' };

function reducer(state: Todo[], action: Action): Todo[] {
  const now = new Date().toISOString();
  switch (action.type) {
    case 'ADD':
      return [{
        id: crypto.randomUUID(),
        title: action.payload.title.trim(),
        description: action.payload.description,
        priority: action.payload.priority,
        dueDate: action.payload.dueDate || undefined,
        status: 'active',
        createdAt: now,
        updatedAt: now,
      }, ...state];
    case 'UPDATE':
      return state.map(t => t.id === action.payload.id
        ? { ...t, ...action.payload, updatedAt: now }
        : t
      );
    case 'DELETE':
      return state.filter(t => t.id !== action.payload);
    case 'TOGGLE':
      return state.map(t => t.id === action.payload
        ? {
            ...t,
            status: t.status === 'active' ? 'completed' : 'active',
            completedAt: t.status === 'active' ? now : undefined,
            updatedAt: now,
          }
        : t
      );
    case 'CLEAR_COMPLETED':
      return state.filter(t => t.status !== 'completed');
    default:
      return state;
  }
}

export function useTodos() {
  const [todos, dispatch] = useReducer(reducer, [], loadTodos);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    saveTodos(todos);
  }, [todos]);

  return { todos, dispatch };
}
