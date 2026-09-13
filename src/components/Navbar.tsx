import { useState, useRef, useEffect } from 'react';
import { Menu, Bell, ChevronDown } from 'lucide-react';
import { HOSPITAL_NAME, CURRENT_DATE, notifications as allNotifications } from '@/data/mockData';
import { NotificationPanel } from './NotificationPanel';

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const unread = allNotifications.filter(n => !n.read).length;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg hover:bg-slate-100">
            <Menu size={20} className="text-slate-600" />
          </button>
          <div>
            <p className="font-semibold text-slate-800 text-sm sm:text-base">{HOSPITAL_NAME}</p>
            <p className="text-xs text-slate-400">{CURRENT_DATE}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <Bell size={20} className="text-slate-600" />
              {unread > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-danger-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unread}
                </span>
              )}
            </button>
            {notifOpen && <NotificationPanel onClose={() => setNotifOpen(false)} />}
          </div>

          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1 pr-2 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-semibold">
                KA
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-slate-700">Karen Allen</p>
                <p className="text-xs text-slate-400">Hospital Assistant</p>
              </div>
              <ChevronDown size={16} className="text-slate-400 hidden sm:block" />
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 card p-2 animate-fade-in">
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="text-sm font-medium text-slate-700">Karen Allen</p>
                  <p className="text-xs text-slate-400">karen.allen@stmaryregional.org</p>
                </div>
                <button className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
                  Profile Settings
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
                  Help & Support
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-danger-600 hover:bg-danger-50 rounded-lg">
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
