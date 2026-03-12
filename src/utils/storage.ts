import type { Todo } from '../types/todo';

const KEY = 'todo-app-v1';

export function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveTodos(todos: Todo[]): void {
  localStorage.setItem(KEY, JSON.stringify(todos));
}
