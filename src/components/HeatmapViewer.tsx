import { useState } from 'react';

interface HeatmapViewerProps {
  src: string;
}

export function HeatmapViewer({ src }: HeatmapViewerProps) {
  const [mode, setMode] = useState<'original' | 'heatmap' | 'overlay'>('overlay');

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode('original')}
          className={`btn ${mode === 'original' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Original
        </button>
        <button
          onClick={() => setMode('heatmap')}
          className={`btn ${mode === 'heatmap' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Heatmap
        </button>
        <button
          onClick={() => setMode('overlay')}
          className={`btn ${mode === 'overlay' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Overlay
        </button>
      </div>

      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900">
        {mode !== 'heatmap' && (
          <img src={src} alt="Original retina" className="absolute inset-0 w-full h-full object-cover" />
        )}
        {mode !== 'original' && (
          <>
            <div
              className="absolute inset-0"
              style={{
                background: mode === 'overlay'
                  ? 'radial-gradient(ellipse 30% 25% at 35% 40%, rgba(239,68,68,0.75) 0%, transparent 70%), radial-gradient(ellipse 25% 20% at 65% 55%, rgba(245,158,11,0.65) 0%, transparent 70%), radial-gradient(ellipse 20% 15% at 50% 70%, rgba(239,68,68,0.6) 0%, transparent 70%), radial-gradient(ellipse 15% 12% at 25% 65%, rgba(251,191,36,0.5) 0%, transparent 70%)'
                  : 'radial-gradient(ellipse 30% 25% at 35% 40%, rgba(239,68,68,0.9) 0%, transparent 70%), radial-gradient(ellipse 25% 20% at 65% 55%, rgba(245,158,11,0.8) 0%, transparent 70%), radial-gradient(ellipse 20% 15% at 50% 70%, rgba(239,68,68,0.75) 0%, transparent 70%), radial-gradient(ellipse 15% 12% at 25% 65%, rgba(251,191,36,0.65) 0%, transparent 70%)',
                mixBlendMode: mode === 'overlay' ? 'screen' : 'normal',
                opacity: mode === 'overlay' ? 0.75 : 1,
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(239,68,68,0.1) 30%, rgba(245,158,11,0.1) 50%, rgba(239,68,68,0.1) 70%, transparent 100%)',
              }}
            />
          </>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="chip bg-black/50 text-white backdrop-blur-sm">Grad-CAM</span>
          <span className="chip bg-black/50 text-white backdrop-blur-sm">Grad-CAM++</span>
          <span className="chip bg-black/50 text-white backdrop-blur-sm">MATLAB</span>
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-500 leading-relaxed">
        Highlighted regions represent areas that contributed strongly to the AI model's screening
        prediction. They are intended to support doctor review and are not independently diagnostic.
      </p>
    </div>
  );
}
