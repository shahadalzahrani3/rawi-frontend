function StatusBadge({ status }) {
  return <span className={`nr-badge nr-badge-${status.tone}`}>{status.label}</span>;
}

export default StatusBadge;