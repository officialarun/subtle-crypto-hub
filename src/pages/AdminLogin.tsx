import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Logo from '@/components/Logo';

const ADMIN_CREDENTIALS = {
  username: 'whoghostrider',
  password: 'paisa123'
};

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Check against fixed credentials
      if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Store admin status in localStorage
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('adminToken', 'admin-authenticated');
        
        toast.success('Admin login successful');
        navigate('/admin/dashboard');
      } else {
        throw new Error('Invalid admin credentials');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Admin login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Logo />
          <h2 className="mt-6 text-3xl font-bold">Admin Login</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter admin credentials to access the dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Enter admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login as Admin'}
          </Button>

          <div className="text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/signin')}
            >
              Back to User Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin; 