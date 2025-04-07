import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Logo from '../Logo';

const AuthCard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSignup = location.pathname === '/signup';

  return (
    <div className="auth-card animate-fade-in">
      <div className="flex justify-center mb-6">
        <Logo />
      </div>
      
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-md shadow-sm">
          <Button
            variant={!isSignup ? 'default' : 'outline'}
            className={`rounded-l-md ${!isSignup ? '' : 'hover:bg-secondary'}`}
            onClick={() => navigate('/signin')}
          >
            Login
          </Button>
          <Button
            variant={isSignup ? 'default' : 'outline'}
            className={`rounded-r-md ${isSignup ? '' : 'hover:bg-secondary'}`}
            onClick={() => navigate('/signup')}
          >
            Signup
          </Button>
        </div>
      </div>

      <div className="animate-slide-up">
        {!isSignup ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
};

export default AuthCard;
