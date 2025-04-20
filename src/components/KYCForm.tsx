
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const KYCForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    dateOfBirth: '',
    address: '',
    governmentId: null as File | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, governmentId: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // Upload ID document
      let governmentIdUrl = '';
      if (formData.governmentId) {
        const fileName = `${user.id}/${Date.now()}_${formData.governmentId.name}`;
        const { error: uploadError, data } = await supabase.storage
          .from('kyc')
          .upload(fileName, formData.governmentId);

        if (uploadError) throw uploadError;
        governmentIdUrl = data.path;
      }

      // Get user's ID from the users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('auth_id', user.id)
        .single();

      if (userError) throw userError;

      // Submit KYC data
      const { error: kycError } = await supabase.from('kyc').insert({
        user_id: userData.id,
        government_id_url: governmentIdUrl,
        date_of_birth: formData.dateOfBirth,
        address: formData.address,
      });

      if (kycError) throw kycError;

      toast({
        title: "Success",
        description: "Your KYC information has been submitted for review.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-gray-800 text-white border-gray-700">
      <h2 className="text-xl font-semibold mb-4">KYC Verification</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            required
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            required
            placeholder="Enter your full address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="governmentId">Government ID</Label>
          <Input
            id="governmentId"
            type="file"
            required
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-dex-primary hover:bg-dex-primary/90"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit KYC'}
        </Button>
      </form>
    </Card>
  );
};

export default KYCForm;
