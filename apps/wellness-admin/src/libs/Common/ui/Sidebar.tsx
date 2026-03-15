import { Link, useNavigate } from '@tanstack/react-router';
import { authClient } from '@/libs/Common/api/auth';
import { LogOut, Users, Package, Activity, Settings } from 'lucide-react';
import { Button } from './Button';

export function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authClient.signOut();
    navigate({ to: '/login' });
  };

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen h-full sticky top-0 transition-all duration-300 shadow-xl">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-indigo-500 p-2 rounded-lg">
          <Activity className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Wellness Admin
        </h1>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">
          Management
        </div>

        <Link
          to="/admins"
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors group"
          activeProps={{
            className: 'bg-indigo-500/10 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/20 font-medium',
          }}
        >
          <Users className="w-5 h-5 transition-transform group-hover:scale-110" />
          User & Admin
        </Link>

        <Link
          to="/packages"
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors group"
          activeProps={{
            className: 'bg-purple-500/10 text-purple-400 hover:text-purple-300 hover:bg-purple-500/20 font-medium',
          }}
        >
          <Package className="w-5 h-5 transition-transform group-hover:scale-110" />
          Wellness Packages
        </Link>
      </nav>

      <div className="p-4 border-t border-slate-800/50 space-y-2">
        <Link
          to="/settings"
          className="flex items-center gap-3 px-3 py-3 w-full rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all group"
          activeProps={{
            className: 'bg-slate-800 text-white font-medium',
          }}
        >
          <Settings className="w-5 h-5 transition-transform group-hover:rotate-45" />
          <span className="font-medium">Settings</span>
        </Link>

        <Button
          variant="ghost"
          onClick={handleLogout}
          className="flex items-center justify-start gap-3 px-3 py-3 w-full h-auto rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all group font-normal"
        >
          <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1 mb-0" />
          <span className="font-medium">Sign Out</span>
        </Button>
      </div>
    </aside>
  );
}
