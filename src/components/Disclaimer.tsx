import { ShieldAlert } from 'lucide-react';

export function Disclaimer() {
  return (
    <div className="flex items-start gap-2 px-4 py-2.5 bg-slate-100/60 border-t border-slate-200">
      <ShieldAlert size={14} className="text-slate-400 mt-0.5 shrink-0" />
      <p className="text-xs text-slate-500 leading-relaxed">
        Prototype for research and hackathon demonstration only. AI results are screening
        assistance and are not a substitute for professional medical diagnosis. Final assessment
        should be performed by a qualified healthcare professional.
      </p>
    </div>
  );
}
