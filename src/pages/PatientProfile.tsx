import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Stethoscope, Calendar, User, Activity } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { patients, getPatientHistory } from '@/data/mockData';
import { FundusImage } from '@/components/FundusImage';
import { StatusBadge, ReviewBadge, QualityBadge } from '@/components/StatusBadge';
import { DetectionCards } from '@/components/DetectionCards';
import { SeverityScale } from '@/components/SeverityScale';
import { HeatmapViewer } from '@/components/HeatmapViewer';
import { stageShort } from '@/lib/utils';

export function PatientProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const patient = patients.find(p => p.id === id);

  if (!patient) {
    return (
      <div className="card p-8 text-center">
        <p className="text-slate-500">Patient not found.</p>
        <button onClick={() => navigate('/patients')} className="btn-primary mt-4">Back to Patients</button>
      </div>
    );
  }

  const history = getPatientHistory(patient.id);
  const trendData = history.map((h, i) => ({ date: h.date, stage: h.stage, idx: i }));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/patients')} className="btn-ghost p-2">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{patient.name}</h1>
          <p className="text-sm text-slate-500">{patient.id} · {patient.age} years · {patient.gender} · {patient.diabetesStatus}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center gap-2 text-slate-500 text-xs mb-1"><Calendar size={14} /> Last Screening</div>
          <p className="font-semibold text-slate-700">{patient.lastScreening}</p>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-2 text-slate-500 text-xs mb-1"><Activity size={14} /> Image Quality</div>
          <QualityBadge score={patient.imageQuality} />
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-2 text-slate-500 text-xs mb-1"><User size={14} /> Current Stage</div>
          <StatusBadge status={patient.status} />
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-2 text-slate-500 text-xs mb-1"><Stethoscope size={14} /> Doctor Review</div>
          <ReviewBadge status={patient.doctorReview} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Current Retinal Image</h3>
          <FundusImage src={patient.fundusImage} className="aspect-[4/3]" />
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-slate-500">AI Confidence: <span className="font-semibold text-slate-700">{patient.aiConfidence}%</span></span>
            <span className="text-slate-500">Date: {patient.screeningDate}</span>
          </div>
        </div>
        <div className="card p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Severity Classification</h3>
          <SeverityScale stage={patient.currentStage} confidence={patient.aiConfidence} />
        </div>
      </div>

      <div className="card p-5">
        <h3 className="font-semibold text-slate-800 mb-4">Detected Retinal Signs</h3>
        <DetectionCards signs={patient.detectedSigns} />
      </div>

      <div className="card p-5">
        <h3 className="font-semibold text-slate-800 mb-4">AI Explainability — Retinal Heatmap</h3>
        <HeatmapViewer src={patient.fundusImage} />
      </div>

      {patient.hasPreviousReport && (
        <div className="card p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Screening History & Severity Trend</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              {history.map((h, i) => (
                <div key={i} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700">{h.date}</p>
                    <p className="text-xs text-slate-500">{h.findings}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-700">{stageShort[h.stage]}</p>
                    <p className="text-xs text-slate-400">{h.confidence}% confidence</p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#94a3b8' }} />
                  <YAxis domain={[0, 4]} ticks={[0, 1, 2, 3, 4]} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                  <ReferenceLine y={3} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Severe', fontSize: 10, fill: '#ef4444' }} />
                  <Line type="monotone" dataKey="stage" stroke="#339eff" strokeWidth={3} dot={{ r: 5, fill: '#339eff' }} />
                </LineChart>
              </ResponsiveContainer>
              {patient.previousStage !== null && patient.currentStage > patient.previousStage && (
                <div className="mt-3 p-3 bg-danger-50 rounded-xl flex items-center gap-2">
                  <Activity size={16} className="text-danger-600" />
                  <span className="text-sm text-danger-700">Progression detected: {stageShort[patient.previousStage]} → {stageShort[patient.currentStage]}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button onClick={() => navigate('/reports')} className="btn-secondary">
          <FileText size={16} />
          View Reports
        </button>
        <button onClick={() => navigate('/doctor-review')} className="btn-primary">
          <Stethoscope size={16} />
          Doctor Review
        </button>
      </div>
    </div>
  );
}
