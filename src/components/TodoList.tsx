import { useTodoContext } from '../context/TodoContext';
import { TodoItem } from './TodoItem';

export function TodoList() {
  const { filteredTodos, filter, stats } = useTodoContext();

  if (filteredTodos.length === 0) {
    return (
      <div className="empty-state">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <rect x="12" y="8" width="40" height="48" rx="6" stroke="currentColor" strokeWidth="2"/>
          <path d="M22 24h20M22 32h20M22 40h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>
          {stats.total === 0 ? 'No tasks yet' : 'No matching tasks'}
        </p>
        <p style={{ fontSize: 14 }}>
          {stats.total === 0
            ? 'Add your first task above to get started'
            : `No tasks match the current filter: "${filter.status}"`}
        </p>
      </div>
    );
  }

  return (
    <div>
      {filteredTodos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
    </div>
  );
}
