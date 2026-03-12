import { useTodoContext } from '../context/TodoContext';
import type { FilterStatus, Priority, SortField } from '../types/todo';

export function FilterBar() {
  const { filter, setFilter, stats, dispatch } = useTodoContext();

  return (
    <div style={{ marginBottom: 16 }}>
      {/* Status tabs */}
      <div className="filter-tabs" style={{ marginBottom: 10 }}>
        {(['all','active','completed'] as FilterStatus[]).map(s => (
          <button key={s} className={`filter-tab ${filter.status === s ? 'active' : ''}`}
            onClick={() => setFilter({ status: s })}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
            {s === 'active' && stats.active > 0 && ` (${stats.active})`}
            {s === 'completed' && stats.completed > 0 && ` (${stats.completed})`}
          </button>
        ))}
      </div>

      {/* Search + filters row */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input
          className="input"
          style={{ flex: 2, minWidth: 160 }}
          placeholder="🔍 Search tasks..."
          value={filter.searchQuery}
          onChange={e => setFilter({ searchQuery: e.target.value })}
        />
        <select className="input" style={{ flex: 1, minWidth: 120 }}
          value={filter.priority}
          onChange={e => setFilter({ priority: e.target.value as Priority | 'all' })}>
          <option value="all">All priorities</option>
          <option value="high">🔴 High</option>
          <option value="medium">🟡 Medium</option>
          <option value="low">🟢 Low</option>
        </select>
        <select className="input" style={{ flex: 1, minWidth: 120 }}
          value={filter.sortBy}
          onChange={e => setFilter({ sortBy: e.target.value as SortField })}>
          <option value="createdAt">Sort: Created</option>
          <option value="dueDate">Sort: Due Date</option>
          <option value="priority">Sort: Priority</option>
          <option value="title">Sort: Title</option>
        </select>
        <button className="btn-icon" title="Toggle sort direction"
          style={{ border: '1px solid var(--border)', borderRadius: 10 }}
          onClick={() => setFilter({ sortDir: filter.sortDir === 'asc' ? 'desc' : 'asc' })}>
          {filter.sortDir === 'asc' ? '↑' : '↓'}
        </button>
      </div>

      {/* Clear completed */}
      {stats.completed > 0 && (
        <div style={{ marginTop: 8, textAlign: 'right' }}>
          <button className="btn btn-ghost" style={{ fontSize: 12, padding: '4px 10px' }}
            onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}>
            Clear {stats.completed} completed
          </button>
        </div>
      )}
    </div>
  );
}
