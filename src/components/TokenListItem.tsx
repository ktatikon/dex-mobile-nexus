
import React from 'react';
import { Token } from '@/types';
import TokenIcon from './TokenIcon';
import TokenPrice from './TokenPrice';

interface TokenListItemProps {
  token: Token;
  onSelect?: () => void;
  showBalance?: boolean;
}

const TokenListItem: React.FC<TokenListItemProps> = ({ 
  token, 
  onSelect,
  showBalance = true
}) => {
  // Calculate USD value
  const usdValue = parseFloat(token.balance || '0') * (token.price || 0);
  
  return (
    <div 
      className="flex items-center justify-between p-3 hover:bg-gray-100/5 rounded-md cursor-pointer"
      onClick={onSelect}
    >
      <div className="flex items-center gap-3">
        <TokenIcon token={token} />
        
        <div>
          <div className="font-medium">{token.symbol}</div>
          <div className="text-xs text-gray-400">{token.name}</div>
        </div>
      </div>
      
      <div className="text-right">
        {showBalance && (
          <>
            <div className="font-medium">
              {parseFloat(token.balance || '0').toFixed(
                token.decimals > 6 ? 4 : 2
              )}
            </div>
            <div className="text-xs text-gray-400">
              ${usdValue.toFixed(2)}
            </div>
          </>
        )}
        
        {!showBalance && token.price && (
          <TokenPrice 
            price={token.price} 
            priceChange={token.priceChange24h} 
            size="sm"
          />
        )}
      </div>
    </div>
  );
};

export default TokenListItem;
