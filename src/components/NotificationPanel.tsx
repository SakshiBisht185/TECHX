import {
  AlertTriangle, CheckCircle2, RefreshCw, Brain, GitCompare, BarChart3, X,
} from 'lucide-react';
import { notifications } from '@/data/mockData';
import type { Notification } from '@/types';

const iconMap: Record<Notification['type'], typeof AlertTriangle> = {
  'high-risk': AlertTriangle,
  'new-screening': CheckCircle2,
  retake: RefreshCw,
  'ai-complete': Brain,
  comparison: GitCompare,
  workload: BarChart3,
};

const colorMap: Record<Notification['type'], string> = {
  'high-risk': 'bg-danger-50 text-danger-600',
  'new-screening': 'bg-success-50 text-success-600',
  retake: 'bg-warning-50 text-warning-600',
  'ai-complete': 'bg-primary-50 text-primary-600',
  comparison: 'bg-teal-50 text-teal-600',
  workload: 'bg-slate-100 text-slate-600',
};

interface NotificationPanelProps {
  onClose: () => void;
}

export function NotificationPanel({ onClose }: NotificationPanelProps) {
  return (
    <div className="absolute right-0 mt-2 w-80 sm:w-96 card p-0 overflow-hidden animate-fade-in z-50">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <p className="font-semibold text-slate-800">Notifications</p>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100">
          <X size={16} className="text-slate-400" />
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((n) => {
          const Icon = iconMap[n.type];
          return (
            <div
              key={n.id}
              className={`flex gap-3 px-4 py-3 border-b border-slate-50 hover:bg-slate-50 transition-colors ${
                !n.read ? 'bg-primary-50/30' : ''
              }`}
            >
              <div className={`p-2 rounded-lg shrink-0 ${colorMap[n.type]}`}>
                <Icon size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700">{n.title}</p>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{n.message}</p>
                <p className="text-xs text-slate-400 mt-1">{n.time}</p>
              </div>
              {!n.read && <div className="w-2 h-2 bg-primary-500 rounded-full shrink-0 mt-2" />}
            </div>
          );
        })}
      </div>
      <button className="w-full px-4 py-3 text-sm font-medium text-primary-600 hover:bg-primary-50 transition-colors">
        View All Notifications
      </button>
    </div>
  );
}
