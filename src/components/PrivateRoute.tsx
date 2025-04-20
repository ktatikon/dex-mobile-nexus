
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface PrivateRouteProps {
  children: React.ReactNode;
  requireKyc?: boolean;
}

const PrivateRoute = ({ children, requireKyc = false }: PrivateRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  const { data: kycStatus, isLoading: kycLoading } = useQuery({
    queryKey: ['kyc-status', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data: userData } = await supabase
        .from('users')
        .select('id')
        .eq('auth_id', user.id)
        .single();

      if (!userData) return null;

      const { data: kyc } = await supabase
        .from('kyc')
        .select('status')
        .eq('user_id', userData.id)
        .maybeSingle();

      return kyc?.status;
    },
    enabled: !!user && requireKyc,
  });

  if (loading || (requireKyc && kycLoading)) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (requireKyc && (!kycStatus || kycStatus !== 'approved')) {
    return <Navigate to="/kyc" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
