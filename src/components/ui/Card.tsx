'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  featured?: boolean;
}

export default function Card({ children, className = '', featured = false }: CardProps) {
  return (
    <div className={`card-box ${featured ? 'card-featured' : ''} ${className}`.trim()}>
      {children}
    </div>
  );
}
