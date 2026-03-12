import { useTodoContext } from '../context/TodoContext';

export function Header() {
  const { stats } = useTodoContext();
  return (
    <div className="mb-8">
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 20, letterSpacing: '-0.5px' }}>
        ✅ My Tasks
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
        {[
          { label: 'Total', value: stats.total, color: 'var(--text)' },
          { label: 'Active', value: stats.active, color: 'var(--accent)' },
          { label: 'Done', value: stats.completed, color: 'var(--priority-low)' },
          { label: 'Overdue', value: stats.overdue, color: 'var(--priority-high)' },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: '12px 16px' }}>
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
