
import React from 'react';
import { Token } from '@/types';

interface TokenIconProps {
  token: Token;
  size?: 'sm' | 'md' | 'lg';
}

const TokenIcon: React.FC<TokenIconProps> = ({ token, size = 'md' }) => {
  const sizeClass = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`relative ${sizeClass[size]} rounded-full bg-white overflow-hidden`}>
      <img 
        src={token.logo} 
        alt={`${token.symbol} logo`} 
        className={`${sizeClass[size]} object-contain`}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = "https://via.placeholder.com/32/8B5CF6/FFFFFF?text=" + token.symbol.substring(0, 2);
        }}
      />
    </div>
  );
};

export default TokenIcon;
