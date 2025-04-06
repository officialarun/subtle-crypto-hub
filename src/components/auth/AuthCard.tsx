
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Logo from '../Logo';

const AuthCard: React.FC = () => {
  const [currentView, setCurrentView] = useState<'login' | 'signup'>('login');

  return (
    <div className="auth-card animate-fade-in">
      <div className="flex justify-center mb-6">
        <Logo />
      </div>
      
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-md shadow-sm">
          <Button
            variant={currentView === 'login' ? 'default' : 'outline'}
            className={`rounded-l-md ${currentView === 'login' ? '' : 'hover:bg-secondary'}`}
            onClick={() => setCurrentView('login')}
          >
            Login
          </Button>
          <Button
            variant={currentView === 'signup' ? 'default' : 'outline'}
            className={`rounded-r-md ${currentView === 'signup' ? '' : 'hover:bg-secondary'}`}
            onClick={() => setCurrentView('signup')}
          >
            Signup
          </Button>
        </div>
      </div>

      <div className="animate-slide-up">
        {currentView === 'login' ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
};

export default AuthCard;
