import { useNavigate } from 'react-router-dom';
import { Eye, Activity, ShieldCheck, Brain, MapPin, ArrowRight } from 'lucide-react';

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-50/30 flex flex-col">
      <header className="flex items-center justify-between px-6 sm:px-10 py-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-600 rounded-xl">
            <Eye size={24} className="text-white" />
          </div>
          <span className="font-bold text-lg text-slate-800">RetinaCare AI</span>
        </div>
        <p className="text-sm text-slate-500 hidden sm:block">AI-assisted retinal screening for faster diabetic eye-care</p>
      </header>

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-5xl w-full">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 text-primary-600 rounded-full text-sm font-medium mb-6">
              <Activity size={14} />
              Hackathon Prototype — Diabetic Retinopathy Screening
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
              AI-Powered Diabetic Retinopathy
              <span className="block text-primary-600">Screening & Hospital Resource Management</span>
            </h1>
            <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Capture fundus images, run AI-powered retina analysis, detect severity stages with
              explainable heatmaps, and optimize hospital resource allocation — all in one platform.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-primary px-8 py-3.5 text-base w-full sm:w-auto"
            >
              Login
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-secondary px-8 py-3.5 text-base w-full sm:w-auto"
            >
              Demo Mode
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { icon: Brain, title: 'AI Retina Analysis', desc: 'CNN-based severity classification (Stage 0–4) with Grad-CAM explainability' },
              { icon: ShieldCheck, title: 'Doctor Review', desc: 'AI screening results with doctor confirmation workflow and clinical notes' },
              { icon: MapPin, title: 'Resource Planning', desc: 'Hospital-level analytics for doctor and assistant allocation recommendations' },
            ].map((f) => (
              <div key={f.title} className="card p-5 text-center">
                <div className="inline-flex p-3 bg-primary-50 text-primary-600 rounded-xl mb-3">
                  <f.icon size={22} />
                </div>
                <p className="font-semibold text-slate-700 text-sm">{f.title}</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="px-6 py-4 text-center">
        <p className="text-xs text-slate-400">
          Prototype for research and hackathon demonstration only. AI results are screening
          assistance and not a substitute for professional medical diagnosis.
        </p>
      </footer>
    </div>
  );
}
