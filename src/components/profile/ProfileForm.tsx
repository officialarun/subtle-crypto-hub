import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  bankName: z.string().min(1, 'Bank name is required'),
  accountNumber: z.string().min(1, 'Account number is required'),
  ifscCode: z.string().min(1, 'IFSC code is required'),
  upiId: z.string().min(1, 'UPI ID is required'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  onUpdate: (data: ProfileFormData) => void;
  initialData?: ProfileFormData;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ onUpdate, initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      onUpdate(data);
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register('name')}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="bankName">Bank Name</Label>
          <Input
            id="bankName"
            {...register('bankName')}
            placeholder="Enter bank name"
          />
          {errors.bankName && (
            <p className="text-sm text-red-500 mt-1">{errors.bankName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="accountNumber">Account Number</Label>
          <Input
            id="accountNumber"
            {...register('accountNumber')}
            placeholder="Enter account number"
          />
          {errors.accountNumber && (
            <p className="text-sm text-red-500 mt-1">{errors.accountNumber.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="ifscCode">IFSC Code</Label>
          <Input
            id="ifscCode"
            {...register('ifscCode')}
            placeholder="Enter IFSC code"
          />
          {errors.ifscCode && (
            <p className="text-sm text-red-500 mt-1">{errors.ifscCode.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="upiId">UPI ID</Label>
          <Input
            id="upiId"
            {...register('upiId')}
            placeholder="Enter UPI ID"
          />
          {errors.upiId && (
            <p className="text-sm text-red-500 mt-1">{errors.upiId.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            {...register('phoneNumber')}
            placeholder="Enter phone number"
          />
          {errors.phoneNumber && (
            <p className="text-sm text-red-500 mt-1">{errors.phoneNumber.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => onUpdate(initialData || {} as ProfileFormData)}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Profile'}
        </Button>
      </div>
    </form>
  );
}; 