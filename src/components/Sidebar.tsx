import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Beaker, Info, HelpCircle, Shield, History } from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: FileText, label: 'Legal Analysis', path: '/legal' },
  { icon: Beaker, label: 'Ingredients', path: '/ingredients' },
];

const secondaryItems = [
  { icon: Info, label: 'About', path: '/about' },
  { icon: HelpCircle, label: 'Help', path: '/help' },
  { icon: Shield, label: 'Privacy', path: '/privacy' },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 glass-sidebar h-screen flex flex-col p-6 fixed left-0 top-0 z-40">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center shadow-lg shadow-brand-blue/20">
          <Shield className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">LegalizeAI</h1>
      </div>

      <nav className="flex-1 space-y-2">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-4">Main Menu</p>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
              isActive 
                ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20" 
                : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}

        <div className="pt-8">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-4">Recent History</p>
          <div className="space-y-1">
            <div className="flex items-center gap-3 px-3 py-2 text-sm text-slate-500 italic">
              <History className="w-4 h-4" />
              <span>No recent history</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="space-y-2 pt-6 border-t border-white/10">
        {secondaryItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
              isActive 
                ? "text-brand-blue" 
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            <item.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};
