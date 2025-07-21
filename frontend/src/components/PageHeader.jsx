const PageHeader = ({ title, description, className = "" }) => {
  return (
    <div className={`mb-8 ${className}`}>
      <h1 className="text-3xl font-bold text-secondary-900">{title}</h1>
      {description && (
        <p className="text-secondary-600 mt-2">{description}</p>
      )}
    </div>
  );
};

export default PageHeader; 