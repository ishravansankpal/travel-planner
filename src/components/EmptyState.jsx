export default function EmptyState({ icon: Icon, title, text, action }) {
  return (
    <div className="empty">
      <Icon size={36} />
      <h3>{title}</h3>
      <p>{text}</p>
      {action}
    </div>
  );
}
