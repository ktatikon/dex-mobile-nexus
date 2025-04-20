
import React from 'react';
import { Button } from "@/components/ui/button";
import { formatAddress } from '@/services/mockData';
import { WalletInfo } from '@/types';

interface DexHeaderProps {
  wallet: WalletInfo | null;
  onConnectWallet: () => void;
  onDisconnectWallet: () => void;
}

const DexHeader: React.FC<DexHeaderProps> = ({ 
  wallet,
  onConnectWallet,
  onDisconnectWallet
}) => {
  return (
    <header className="px-4 py-3 flex items-center justify-between bg-dex-dark sticky top-0 z-10">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-white">
          <span className="text-dex-primary">V</span>-DEX
        </h1>
      </div>
      
      <div>
        {wallet ? (
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="sm"
              className="border-dex-primary text-dex-primary hover:bg-dex-primary/10"
              onClick={onDisconnectWallet}
            >
              {formatAddress(wallet.address)}
            </Button>
          </div>
        ) : (
          <Button 
            variant="outline" 
            size="sm"
            className="border-dex-primary text-dex-primary hover:bg-dex-primary/10"
            onClick={onConnectWallet}
          >
            Connect Wallet
          </Button>
        )}
      </div>
    </header>
  );
};

export default DexHeader;
