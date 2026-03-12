import React, { useState, useRef } from 'react';
import { useTodoContext } from '../context/TodoContext';
import type { Priority } from '../types/todo';

export function AddTodoForm() {
  const { dispatch } = useTodoContext();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  function submit() {
    if (!title.trim()) { setError('Title is required'); return; }
    dispatch({ type: 'ADD', payload: { title, priority, dueDate: dueDate || undefined } });
    setTitle(''); setPriority('medium'); setDueDate(''); setOpen(false); setError('');
  }

  return (
    <div className="card" style={{ padding: 16, marginBottom: 16 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          ref={inputRef}
          className="input"
          placeholder="Add a new task..."
          value={title}
          onChange={e => { setTitle(e.target.value); setError(''); if (e.target.value) setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={e => e.key === 'Enter' && submit()}
        />
        <button className="btn btn-primary" onClick={submit} style={{ whiteSpace: 'nowrap' }}>
          + Add
        </button>
      </div>
      {error && <p style={{ color: 'var(--priority-high)', fontSize: 12, marginTop: 6 }}>{error}</p>}
      <div className={`add-form-extra ${open ? 'open' : ''}`}>
        <div style={{ paddingTop: 12, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>PRIORITY</label>
            <div className="priority-seg">
              {(['low','medium','high'] as Priority[]).map(p => (
                <React.Fragment key={p}>
                  <input type="radio" id={`p-${p}`} name="add-priority" value={p}
                    checked={priority === p} onChange={() => setPriority(p)} />
                  <label htmlFor={`p-${p}`}>{p.charAt(0).toUpperCase() + p.slice(1)}</label>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 160 }}>
            <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>DUE DATE</label>
            <input className="input" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
}
