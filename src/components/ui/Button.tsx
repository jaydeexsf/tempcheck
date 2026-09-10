'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  href?: string;
  className?: string;
}

export default function Button({
  variant = 'primary',
  size = 'medium',
  children,
  href,
  className = '',
  ...props
}: ButtonProps) {
  const baseClass = `btn btn-${variant} ${size === 'large' ? 'btn-large' : ''} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={baseClass}>
        {children}
      </a>
    );
  }

  return (
    <button className={baseClass} {...props}>
      {children}
    </button>
  );
}
