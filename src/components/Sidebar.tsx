import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, ScanLine, Users, FileText, Stethoscope,
  BarChart3, MapPin, Settings, Eye,
} from 'lucide-react';
import { HOSPITAL_NAME } from '@/data/mockData';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/screening', label: 'New Screening', icon: ScanLine },
  { to: '/patients', label: 'Patients', icon: Users },
  { to: '/reports', label: 'Reports', icon: FileText },
  { to: '/doctor-review', label: 'Doctors', icon: Stethoscope },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/resource-planning', label: 'Resource Planning', icon: MapPin },
  { to: '/settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-slate-900/40 z-30 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-200">
          <div className="p-2 bg-primary-600 rounded-xl">
            <Eye size={22} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-slate-800 leading-tight">RetinaCare AI</p>
            <p className="text-xs text-slate-400">Diabetic Retinopathy Screening</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-5 py-4 border-t border-slate-200">
          <p className="text-xs text-slate-400 font-medium">{HOSPITAL_NAME}</p>
          <p className="text-xs text-slate-300 mt-0.5">Hospital Assistant Portal</p>
        </div>
      </aside>
    </>
  );
}
