
import React from 'react';
import SwapForm from '@/components/SwapForm';
import { mockTokens } from '@/services/mockData';
import { SwapParams } from '@/types';
import { useToast } from '@/hooks/use-toast';

const TradePage = () => {
  const { toast } = useToast();
  
  const handleSwap = (params: SwapParams) => {
    const { fromToken, toToken, fromAmount, toAmount } = params;
    
    // Show success toast
    toast({
      title: "Transaction Submitted",
      description: `Swapping ${fromAmount} ${fromToken?.symbol} for ${toAmount} ${toToken?.symbol}`,
    });
    
    // Simulate transaction confirmation
    setTimeout(() => {
      toast({
        title: "Transaction Confirmed",
        description: `Swapped ${fromAmount} ${fromToken?.symbol} for ${toAmount} ${toToken?.symbol}`,
        variant: "default",
      });
    }, 2000);
  };
  
  return (
    <div className="container mx-auto px-4 pt-16 pb-24">
      <h1 className="text-2xl font-bold text-white mb-6">Trade</h1>
      <SwapForm 
        tokens={mockTokens}
        onSwap={handleSwap}
      />
    </div>
  );
};

export default TradePage;
