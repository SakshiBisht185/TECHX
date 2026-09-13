import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle, CheckCircle2, RefreshCw, FileText, Stethoscope, ArrowRight, ClipboardList,
} from 'lucide-react';
import { patients, doctors } from '@/data/mockData';
import { FundusImage } from '@/components/FundusImage';
import { StatusBadge, QualityBadge } from '@/components/StatusBadge';
import { DetectionCards } from '@/components/DetectionCards';
import { SeverityScale } from '@/components/SeverityScale';
import { HeatmapViewer } from '@/components/HeatmapViewer';
import { stageShort, stageLabels } from '@/lib/utils';
import type { DoctorReviewStatus } from '@/types';

export function DoctorReview() {
  const navigate = useNavigate();
  const highRiskPatients = patients.filter(p => p.currentStage >= 2);
  const [selectedId, setSelectedId] = useState(highRiskPatients[0]?.id || patients[0].id);
  const patient = patients.find(p => p.id === selectedId)!;
  const [assessment, setAssessment] = useState<DoctorReviewStatus>('Confirmed');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Doctor Review</h1>
        <p className="text-sm text-slate-500 mt-1">Review high-risk AI screening results and provide clinical assessment</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="card p-4">
          <p className="text-xs font-medium text-slate-500 mb-3">PATIENTS REQUIRING REVIEW</p>
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {highRiskPatients.map(p => (
              <button
                key={p.id}
                onClick={() => { setSelectedId(p.id); setSubmitted(false); }}
                className={`w-full text-left p-3 rounded-xl transition-all ${
                  p.id === selectedId ? 'bg-primary-50 ring-2 ring-primary-200' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-700">{p.name}</p>
                    <p className="text-xs text-slate-400">{p.id}</p>
                  </div>
                  <StatusBadge status={p.status} />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          {patient.currentStage >= 3 && (
            <div className="card p-5 bg-danger-50/40 border-danger-200">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-danger-100 text-danger-600 rounded-xl">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <p className="font-semibold text-danger-700">High-Risk Screening Result</p>
                  <p className="text-sm text-danger-600 mt-1">
                    Patient {patient.name} ({patient.id}) has been classified as {stageShort[patient.currentStage]} — {stageLabels[patient.currentStage]}.
                    Doctor review recommended immediately.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800">Patient Information</h3>
              <StatusBadge status={patient.status} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div><p className="text-xs text-slate-400">Patient ID</p><p className="text-sm font-medium text-slate-700">{patient.id}</p></div>
              <div><p className="text-xs text-slate-400">Name</p><p className="text-sm font-medium text-slate-700">{patient.name}</p></div>
              <div><p className="text-xs text-slate-400">Age</p><p className="text-sm font-medium text-slate-700">{patient.age}</p></div>
              <div><p className="text-xs text-slate-400">Diabetes</p><p className="text-sm font-medium text-slate-700">{patient.diabetesStatus}</p></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card p-5">
              <h3 className="font-semibold text-slate-800 mb-4">Current Retinal Image</h3>
              <FundusImage src={patient.fundusImage} className="aspect-[4/3]" />
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-slate-500">Quality: <QualityBadge score={patient.imageQuality} /></span>
                <span className="text-slate-500">Confidence: <span className="font-semibold text-slate-700">{patient.aiConfidence}%</span></span>
              </div>
            </div>
            <div className="card p-5">
              <h3 className="font-semibold text-slate-800 mb-4">AI Screening Result</h3>
              <SeverityScale stage={patient.currentStage} confidence={patient.aiConfidence} />
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-semibold text-slate-800 mb-4">Detected Signs</h3>
            <DetectionCards signs={patient.detectedSigns} />
          </div>

          <div className="card p-5">
            <h3 className="font-semibold text-slate-800 mb-4">AI Explainability — Heatmap</h3>
            <HeatmapViewer src={patient.fundusImage} />
          </div>

          {patient.hasPreviousReport && patient.previousStage !== null && (
            <div className="card p-5">
              <h3 className="font-semibold text-slate-800 mb-4">Previous Report Comparison</h3>
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <p className="text-xs text-slate-400">Previous</p>
                  <p className="text-lg font-semibold text-slate-700 mt-1">{stageShort[patient.previousStage]}</p>
                </div>
                <ArrowRight size={24} className={patient.currentStage > patient.previousStage ? 'text-danger-500' : 'text-slate-400'} />
                <div className="text-center">
                  <p className="text-xs text-slate-400">Current</p>
                  <p className="text-lg font-semibold text-slate-700 mt-1">{stageShort[patient.currentStage]}</p>
                </div>
                {patient.currentStage > patient.previousStage && (
                  <span className="chip bg-danger-100 text-danger-700 ml-4">Progression detected</span>
                )}
              </div>
            </div>
          )}

          <div className="card p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Clinical Assessment</h3>
            {submitted ? (
              <div className="p-4 bg-success-50 rounded-xl flex items-center gap-3">
                <CheckCircle2 size={20} className="text-success-600" />
                <div>
                  <p className="text-sm font-medium text-success-700">Assessment Submitted</p>
                  <p className="text-xs text-success-600 mt-0.5">Doctor's assessment: {assessment}. Clinical notes have been recorded.</p>
                </div>
                <button onClick={() => navigate('/reports')} className="btn-secondary ml-auto">
                  <FileText size={16} />
                  View Report
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="label">Doctor's Assessment</label>
                  <select className="input" value={assessment} onChange={e => setAssessment(e.target.value as DoctorReviewStatus)}>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Requires Further Examination">Requires Further Examination</option>
                    <option value="Re-scan Required">Re-scan Required</option>
                    <option value="No Significant Finding">No Significant Finding</option>
                  </select>
                </div>
                <div>
                  <label className="label">Clinical Notes</label>
                  <textarea
                    className="input min-h-[100px] resize-y"
                    placeholder="Enter clinical observations and recommendations..."
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => setSubmitted(true)} className="btn-success">
                    <CheckCircle2 size={16} />
                    Confirm Finding
                  </button>
                  <button onClick={() => navigate('/screening')} className="btn-secondary">
                    <RefreshCw size={16} />
                    Request Re-scan
                  </button>
                  <button onClick={() => setNotes('Clinical review in progress. Patient shows signs of progression. Recommend immediate ophthalmology referral.')} className="btn-secondary">
                    <ClipboardList size={16} />
                    Add Clinical Notes
                  </button>
                  <button onClick={() => { setSubmitted(true); }} className="btn-primary">
                    <FileText size={16} />
                    Generate Report
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="card p-5">
            <h3 className="font-semibold text-slate-800 mb-4">Available Doctors</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {doctors.map(d => (
                <div key={d.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-semibold">
                    {d.name.split(' ').slice(-1)[0].charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700">{d.name}</p>
                    <p className="text-xs text-slate-400">{d.specialty}</p>
                  </div>
                  <span className={`chip ${d.available ? 'bg-success-100 text-success-700' : 'bg-slate-100 text-slate-500'}`}>
                    {d.available ? 'Available' : 'Busy'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
