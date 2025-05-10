import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = '', variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg'
    };
    const variants = {
      primary: 'bg-primary text-white hover:bg-primary-hover active:bg-primary-active focus:ring-primary',
      secondary: 'bg-secondary text-white hover:bg-secondary-hover active:bg-secondary-active focus:ring-secondary',
      outline: 'border border-primary text-primary hover:bg-primary-hover/10 active:bg-primary-hover/20 focus:ring-primary',
      ghost: 'text-primary hover:bg-primary-hover/5 active:bg-primary-hover/10 focus:ring-primary/20'
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
