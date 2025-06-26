import React from 'react';
import { Home, Calendar, BookOpen, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: Calendar, label: 'Sessions' },
    { icon: BookOpen, label: 'Subjects' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <img src="/icons/logo.svg" alt="Nora AI" className="h-8 w-8" />
          <span className="text-xl font-marlin font-semibold text-gray-900">Nora AI</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Button
                variant={item.active ? "default" : "ghost"}
                className={`w-full justify-start gap-3 ${
                  item.active ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' : ''
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <Button variant="ghost" className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50">
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;