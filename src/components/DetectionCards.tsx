import { Eye, Droplet, GitBranch, Layers, CheckCircle2, XCircle } from 'lucide-react';
import type { DetectedSigns } from '@/types';

interface DetectionCardsProps {
  signs: DetectedSigns;
}

export function DetectionCards({ signs }: DetectionCardsProps) {
  const cards = [
    { label: 'Abnormal Spots', icon: Eye, ...signs.abnormalSpots },
    { label: 'Bleeding', icon: Droplet, ...signs.bleeding },
    { label: 'Vessel Abnormalities', icon: GitBranch, ...signs.vesselAbnormalities },
    { label: 'Retinal Structure', icon: Layers, ...signs.retinalStructure },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${card.detected ? 'bg-danger-50 text-danger-600' : 'bg-success-50 text-success-600'}`}>
                <card.icon size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700">{card.label}</p>
                <p className={`text-xs font-medium ${card.detected ? 'text-danger-600' : 'text-success-600'}`}>
                  {card.detected ? 'Detected' : 'Not Detected'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-slate-800">{card.confidence}%</p>
              <div className="flex items-center gap-1">
                {card.detected ? (
                  <CheckCircle2 size={14} className="text-danger-500" />
                ) : (
                  <XCircle size={14} className="text-success-500" />
                )}
              </div>
            </div>
          </div>
          <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${card.detected ? 'bg-danger-500' : 'bg-success-500'}`}
              style={{ width: `${card.confidence}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
