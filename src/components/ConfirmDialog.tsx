import ReactDOM from 'react-dom';

interface Props { message: string; onConfirm: () => void; onCancel: () => void; }

export function ConfirmDialog({ message, onConfirm, onCancel }: Props) {
  return ReactDOM.createPortal(
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onCancel()}>
      <div className="modal" style={{ maxWidth: 360 }}>
        <p style={{ marginBottom: 20, color: 'var(--text)' }}>{message}</p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
          <button className="btn btn-danger" onClick={onConfirm} autoFocus>Delete</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
