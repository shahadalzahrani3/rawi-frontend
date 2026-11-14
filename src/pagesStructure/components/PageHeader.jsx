function PageHeader({ eyebrow, title, subtitle, children }) {
  return (
    <header className="nr-page-header">
      <div>
        {eyebrow && <p className="nr-eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {subtitle && <p className="nr-subtitle">{subtitle}</p>}
      </div>

      {children && <div className="nr-page-actions">{children}</div>}
    </header>
  );
}

export default PageHeader;