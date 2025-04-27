
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, LogOut, User, BarChart2, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const DexNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-dex-dark border-t border-dex-primary/30 p-4 flex justify-around items-center md:top-0 md:bottom-auto md:border-t-0 md:border-b z-50">
      <Link to="/">
        <Button
          variant="ghost"
          size="sm"
          className={`flex flex-col items-center gap-1 ${
            isActive('/') ? 'text-dex-accent' : 'text-white'
          }`}
        >
          <Home size={20} />
          <span className="text-xs">Home</span>
        </Button>
      </Link>

      <Link to="/trade">
        <Button
          variant="ghost"
          size="sm"
          className={`flex flex-col items-center gap-1 ${
            isActive('/trade') ? 'text-dex-accent' : 'text-white'
          }`}
        >
          <BarChart2 size={20} />
          <span className="text-xs">Market</span>
        </Button>
      </Link>

      <Link to="/wallet">
        <Button
          variant="ghost"
          size="sm"
          className={`flex flex-col items-center gap-1 ${
            isActive('/wallet') ? 'text-dex-accent' : 'text-white'
          }`}
        >
          <Wallet size={20} />
          <span className="text-xs">Wallet</span>
        </Button>
      </Link>

      <Link to="/profile">
        <Button
          variant="ghost"
          size="sm"
          className={`flex flex-col items-center gap-1 ${
            isActive('/profile') ? 'text-dex-accent' : 'text-white'
          }`}
        >
          <User size={20} />
          <span className="text-xs">Profile</span>
        </Button>
      </Link>

      <Button
        variant="ghost"
        size="sm"
        className="flex flex-col items-center gap-1 text-white hover:text-dex-accent"
        onClick={handleLogout}
      >
        <LogOut size={20} />
        <span className="text-xs">Logout</span>
      </Button>
    </nav>
  );
};

export default DexNavigation;
