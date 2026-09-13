import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, FileText, Eye, Printer } from 'lucide-react';
import { patients } from '@/data/mockData';
import { FundusImage } from '@/components/FundusImage';
import { StatusBadge, ReviewBadge, QualityBadge } from '@/components/StatusBadge';
import { DetectionCards } from '@/components/DetectionCards';
import { SeverityScale } from '@/components/SeverityScale';
import { HeatmapViewer } from '@/components/HeatmapViewer';
import { stageShort, stageLabels } from '@/lib/utils';

export function Reports() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(patients[0].id);
  const patient = patients.find(p => p.id === selectedId)!;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Reports</h1>
        <p className="text-sm text-slate-500 mt-1">View and download retinal screening reports</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="card p-4 lg:col-span-1">
          <p className="text-xs font-medium text-slate-500 mb-3">SELECT PATIENT</p>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {patients.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={`w-full text-left p-3 rounded-xl transition-all ${
                  p.id === selectedId ? 'bg-primary-50 ring-2 ring-primary-200' : 'hover:bg-slate-50'
                }`}
              >
                <p className="text-sm font-medium text-slate-700">{p.name}</p>
                <p className="text-xs text-slate-400">{p.id} · {stageShort[p.currentStage]}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-600 rounded-xl">
                  <Eye size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">RetinaCare AI — Retinal Screening Report</p>
                  <p className="text-xs text-slate-400">Report ID: RC-{patient.id}-{patient.screeningDate.replace(/-/g, '')}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => window.print()} className="btn-secondary">
                  <Printer size={16} />
                  Print
                </button>
                <button onClick={() => window.print()} className="btn-primary">
                  <Download size={16} />
                  Download Report
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div>
                <p className="text-xs text-slate-400">Patient ID</p>
                <p className="text-sm font-medium text-slate-700">{patient.id}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Patient Name</p>
                <p className="text-sm font-medium text-slate-700">{patient.name}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Age / Gender</p>
                <p className="text-sm font-medium text-slate-700">{patient.age} / {patient.gender}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Diabetes Status</p>
                <p className="text-sm font-medium text-slate-700">{patient.diabetesStatus}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Screening Date</p>
                <p className="text-sm font-medium text-slate-700">{patient.screeningDate}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Image Quality</p>
                <QualityBadge score={patient.imageQuality} />
              </div>
              <div>
                <p className="text-xs text-slate-400">AI Confidence</p>
                <p className="text-sm font-medium text-slate-700">{patient.aiConfidence}%</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Doctor Review</p>
                <ReviewBadge status={patient.doctorReview} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-xs font-medium text-slate-500 mb-2">RETINAL IMAGE</p>
                <FundusImage src={patient.fundusImage} className="aspect-[4/3]" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 mb-2">AI SCREENING STAGE</p>
                <div className="card p-4 bg-slate-50/50">
                  <SeverityScale stage={patient.currentStage} confidence={patient.aiConfidence} />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-xs font-medium text-slate-500 mb-3">DETECTED RETINAL SIGNS</p>
              <DetectionCards signs={patient.detectedSigns} />
            </div>

            <div className="mb-6">
              <p className="text-xs font-medium text-slate-500 mb-3">AI EXPLAINABILITY — RETINAL HEATMAP</p>
              <HeatmapViewer src={patient.fundusImage} />
            </div>

            {patient.hasPreviousReport && patient.previousStage !== null && (
              <div className="mb-6">
                <p className="text-xs font-medium text-slate-500 mb-3">PREVIOUS COMPARISON</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="card p-4">
                    <p className="text-xs text-slate-400">Previous: {stageShort[patient.previousStage]}</p>
                    <p className="text-sm text-slate-600 mt-1">{stageLabels[patient.previousStage]}</p>
                  </div>
                  <div className="card p-4">
                    <p className="text-xs text-slate-400">Current: {stageShort[patient.currentStage]}</p>
                    <p className="text-sm text-slate-600 mt-1">{stageLabels[patient.currentStage]}</p>
                  </div>
                </div>
                {patient.currentStage > patient.previousStage && (
                  <div className="mt-3 p-3 bg-danger-50 rounded-xl">
                    <p className="text-sm text-danger-700">Possible progression detected — requires doctor review.</p>
                  </div>
                )}
              </div>
            )}

            <div className="mb-6">
              <p className="text-xs font-medium text-slate-500 mb-3">DOCTOR ASSESSMENT</p>
              <div className="card p-4">
                <p className="text-sm text-slate-600"><span className="font-medium">Assessment:</span> {patient.doctorReview}</p>
                <p className="text-sm text-slate-600 mt-2"><span className="font-medium">Recommendation:</span> {
                  patient.currentStage >= 3 ? 'Immediate ophthalmology referral recommended. Follow-up screening in 3 months.' :
                  patient.currentStage >= 1 ? 'Regular monitoring recommended. Follow-up screening in 6 months.' :
                  'No signs of diabetic retinopathy. Annual screening recommended.'
                }</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-500 leading-relaxed">
                This report is generated by RetinaCare AI as a screening assistance tool. AI results are
                not a substitute for professional medical diagnosis. Final assessment should be performed
                by a qualified healthcare professional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
