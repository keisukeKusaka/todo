import { useState } from 'react';
import type { Todo } from '../types/todo';
import { useTodoContext } from '../context/TodoContext';
import { PriorityBadge } from './PriorityBadge';
import { DueDateDisplay } from './DueDateDisplay';
import { EditModal } from './EditModal';
import { ConfirmDialog } from './ConfirmDialog';

export function TodoItem({ todo }: { todo: Todo }) {
  const { dispatch } = useTodoContext();
  const [editing, setEditing] = useState(false);
  const [confirming, setConfirming] = useState(false);

  return (
    <>
      <div
        className={`card todo-item priority-${todo.priority} ${todo.status === 'completed' ? 'todo-completed' : ''}`}
        style={{ padding: '12px 14px', display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}
      >
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={todo.status === 'completed'}
          onChange={() => dispatch({ type: 'TOGGLE', payload: todo.id })}
          style={{ marginTop: 2 }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span className="todo-title" style={{ fontSize: 15, fontWeight: 500, wordBreak: 'break-word' }}>
              {todo.title}
            </span>
            <PriorityBadge priority={todo.priority} />
          </div>
          {todo.description && (
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>{todo.description}</p>
          )}
          <div style={{ marginTop: 4 }}>
            <DueDateDisplay dueDate={todo.dueDate} />
          </div>
        </div>
        <div className="todo-actions" style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
          <button className="btn-icon" title="Edit" onClick={() => setEditing(true)}>✏️</button>
          <button className="btn-icon delete" title="Delete" onClick={() => setConfirming(true)}>🗑️</button>
        </div>
      </div>

      {editing && <EditModal todo={todo} onClose={() => setEditing(false)} />}
      {confirming && (
        <ConfirmDialog
          message={`Delete "${todo.title}"?`}
          onConfirm={() => { dispatch({ type: 'DELETE', payload: todo.id }); setConfirming(false); }}
          onCancel={() => setConfirming(false)}
        />
      )}
    </>
  );
}
