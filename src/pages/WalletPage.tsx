
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TokenListItem from '@/components/TokenListItem';
import { calculateTotalBalance, formatCurrency, mockWallet } from '@/services/mockData';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const WalletPage: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { address, tokens } = mockWallet;

  // Sort tokens by value (balance * price)
  const sortedTokens = [...tokens].sort((a, b) => {
    const aValue = parseFloat(a.balance || '0') * (a.price || 0);
    const bValue = parseFloat(b.balance || '0') * (b.price || 0);
    return bValue - aValue;
  });

  const totalBalance = calculateTotalBalance(tokens);

  const handleCopyAddress = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(address)
        .then(() => {
          toast({
            title: "Address Copied",
            description: "Wallet address copied to clipboard",
          });
        })
        .catch(() => {
          toast({
            title: "Failed to copy",
            description: "Could not copy address to clipboard",
            variant: "destructive",
          });
        });
    }
  };

  const handleGoToSwap = (token: any) => {
    navigate('/swap', { state: { preSelectedToken: token } });
  };

  return (
    <div className="pb-20">
      <Card className="p-4 mb-6 bg-dex-dark text-white border-gray-700">
        <h2 className="text-lg font-semibold mb-1">Wallet</h2>

        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-2xl font-bold">${formatCurrency(totalBalance)}</div>
            <button
              className="text-sm text-gray-400 hover:text-white flex items-center gap-1"
              onClick={handleCopyAddress}
            >
              {address}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
              </svg>
            </button>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-dex-primary border-dex-primary hover:bg-dex-primary/10 h-9"
              onClick={() => navigate('/send')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <path d="M12 5v14"/>
                <path d="M5 12h14"/>
              </svg>
              Send
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="text-dex-primary border-dex-primary hover:bg-dex-primary/10 h-9"
              onClick={() => navigate('/receive')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <path d="M12 19V5"/>
                <path d="M5 12h14"/>
              </svg>
              Receive
            </Button>
          </div>
        </div>
      </Card>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-3">Your Assets</h2>
        <Card className="p-0 bg-dex-dark text-white border-gray-700">
          {sortedTokens.map(token => (
            <TokenListItem
              key={token.id}
              token={token}
              onSelect={() => handleGoToSwap(token)}
            />
          ))}
        </Card>
      </div>
    </div>
  );
};

export default WalletPage;
