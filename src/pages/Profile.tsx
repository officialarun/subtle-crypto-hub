import React, { useState, useEffect } from 'react';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { authAPI, userAPI } from '@/lib/api';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';

export const Profile: React.FC = () => {
  const { token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    console.log('Fetching profile with token:', token);
    if (!token) {
      setError('No authentication token found');
      setIsLoading(false);
      return;
    }

    try {
      const response = await authAPI.getProfile(token);
      console.log('Profile response:', response);
      // The profile data is nested under the profile property
      setProfile(response.profile || {});
      setError(null);
    } catch (error: any) {
      console.error('Profile fetch error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to load profile';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [token]);

  const handleProfileUpdate = async (updatedProfile: any) => {
    console.log('Updating profile with data:', updatedProfile);
    try {
      // Update the profile on the server
      const response = await userAPI.updateProfile(token, updatedProfile);
      console.log('Update profile response:', response);
      // Update local state with the server response
      setProfile(response.profile);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error: any) {
      console.error('Update profile error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update profile';
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="container max-w-4xl mx-auto py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-4xl mx-auto py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">Error Loading Profile</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={fetchProfile}>Try Again</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Profile Settings</h1>
          {!isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2"
            >
              <Pencil className="h-4 w-4" />
              {profile ? 'Edit Profile' : 'Create Profile'}
            </Button>
          )}
        </div>

        {isEditing ? (
          <ProfileForm onUpdate={handleProfileUpdate} initialData={profile} />
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                <p className="mt-1">{profile?.name || 'Not set'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Bank Name</h3>
                <p className="mt-1">{profile?.bankName || 'Not set'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Account Number</h3>
                <p className="mt-1">{profile?.accountNumber || 'Not set'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">IFSC Code</h3>
                <p className="mt-1">{profile?.ifscCode || 'Not set'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">UPI ID</h3>
                <p className="mt-1">{profile?.upiId || 'Not set'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                <p className="mt-1">{profile?.phoneNumber || 'Not set'}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 