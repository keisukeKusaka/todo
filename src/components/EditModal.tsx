import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import type { Todo, Priority } from '../types/todo';
import { useTodoContext } from '../context/TodoContext';

interface Props { todo: Todo; onClose: () => void; }

export function EditModal({ todo, onClose }: Props) {
  const { dispatch } = useTodoContext();
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');
  const [priority, setPriority] = useState<Priority>(todo.priority);
  const [dueDate, setDueDate] = useState(todo.dueDate || '');
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => { firstRef.current?.focus(); }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  function save() {
    if (!title.trim()) return;
    dispatch({ type: 'UPDATE', payload: {
      id: todo.id, title: title.trim(), description: description || undefined,
      priority, dueDate: dueDate || undefined,
    }});
    onClose();
  }

  return ReactDOM.createPortal(
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>Edit Task</h2>
          <button className="btn-icon" onClick={onClose} style={{ fontSize: 20 }}>×</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>TITLE *</label>
            <input ref={firstRef} className="input" value={title}
              onChange={e => setTitle(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && save()} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>DESCRIPTION</label>
            <textarea className="input" rows={3} value={description}
              onChange={e => setDescription(e.target.value)}
              style={{ resize: 'vertical', fontFamily: 'inherit' }} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>PRIORITY</label>
            <div className="priority-seg">
              {(['low','medium','high'] as Priority[]).map(p => (
                <React.Fragment key={p}>
                  <input type="radio" id={`edit-p-${p}`} name="edit-priority" value={p}
                    checked={priority === p} onChange={() => setPriority(p)} />
                  <label htmlFor={`edit-p-${p}`}>{p.charAt(0).toUpperCase() + p.slice(1)}</label>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div>
            <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>DUE DATE</label>
            <input className="input" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 20, justifyContent: 'flex-end' }}>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={save} disabled={!title.trim()}>Save Changes</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
