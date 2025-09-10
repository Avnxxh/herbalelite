import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  onClick,
  type = 'button',
  href
}) => {
  // Base classes that apply to all buttons
  const baseClasses = 'px-6 py-3 rounded-lg font-semibold text-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Variant-specific classes
  const variantClasses = {
    primary: 'bg-peach-500 hover:bg-peach-600 text-white shadow-lg focus:ring-peach-500',
    secondary: 'border-2 border-peach-500 text-peach-600 hover:bg-peach-50 focus:ring-peach-500'
  };

  // Combine all classes
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  // If href is provided, render as Link, otherwise as button
  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button 
      type={type}
      className={combinedClasses}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;