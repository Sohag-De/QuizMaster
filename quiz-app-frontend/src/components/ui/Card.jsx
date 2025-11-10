// src/components/ui/Card.jsx
const Card = ({ children, className = '', padding = 'medium', shadow = 'medium' }) => {
  const paddingClasses = {
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8'
  };
  
  const shadowClasses = {
    none: '',
    small: 'shadow-sm',
    medium: 'shadow-md',
    large: 'shadow-xl'
  };

  return (
    <div className={`
      bg-white rounded-xl border border-gray-200
      ${paddingClasses[padding]}
      ${shadowClasses[shadow]}
      ${className}
    `}>
      {children}
    </div>
  );
};

export default Card;