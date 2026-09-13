import type { SeverityStage } from '@/types';
import { stageShort, stageLabels, stageColors } from '@/lib/utils';

interface SeverityScaleProps {
  stage: SeverityStage;
  confidence?: number;
}

export function SeverityScale({ stage, confidence }: SeverityScaleProps) {
  const stages: SeverityStage[] = [0, 1, 2, 3, 4];
  return (
    <div>
      <div className="flex items-end justify-between gap-2">
        {stages.map((s) => (
          <div key={s} className="flex-1 text-center">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                s === stage ? 'scale-y-150' : ''
              }`}
              style={{ backgroundColor: s === stage ? stageColors[s] : '#e2e8f0' }}
            />
            <p
              className={`mt-2 text-xs font-semibold ${s === stage ? 'text-slate-800' : 'text-slate-400'}`}
            >
              {stageShort[s]}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Predicted Stage</p>
          <p className="text-2xl font-bold" style={{ color: stageColors[stage] }}>
            {stageShort[stage]} — {stageLabels[stage]}
          </p>
        </div>
        {confidence !== undefined && (
          <div className="text-right">
            <p className="text-sm text-slate-500">AI Confidence</p>
            <p className="text-2xl font-bold text-slate-800">{confidence}%</p>
          </div>
        )}
      </div>
    </div>
  );
}
