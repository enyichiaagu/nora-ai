import React from 'react';
import { LogOut } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/icons/logo.svg" alt="Nora AI" className="w-8 h-8" />
          <p className="text-lg font-semibold">Nora AI</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-app-primary text-white rounded-lg hover:bg-blue-600 transition-colors">
          <LogOut className="w-4 h-4" />
          Sign In
        </button>
      </div>
    </header>
  );
};

export default Header;