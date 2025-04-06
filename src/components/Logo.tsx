
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
        <span className="text-white font-bold text-xl">C</span>
      </div>
      <span className="font-semibold text-lg text-foreground">CryptoHub</span>
    </div>
  );
};

export default Logo;
