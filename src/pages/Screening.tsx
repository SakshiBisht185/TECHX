import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  User, Camera, Upload, X, Gauge, Wand2, Brain, CheckCircle2,
  ArrowRight, ArrowLeft, Wifi, WifiOff, Cpu, Image as ImageIcon,
  Activity, Scan, AlertTriangle, FileText, Stethoscope, ChevronRight,
} from 'lucide-react';
import { FundusImage } from '@/components/FundusImage';
import { SeverityScale } from '@/components/SeverityScale';
import { HeatmapViewer } from '@/components/HeatmapViewer';
import { DetectionCards } from '@/components/DetectionCards';
import { FUNDUS_IMAGES } from '@/data/mockData';
import type { ScreeningStep, ScreeningForm } from '@/types';

const steps: { key: ScreeningStep; label: string; icon: typeof User }[] = [
  { key: 'patient', label: 'Patient Details', icon: User },
  { key: 'capture', label: 'Capture/Upload', icon: Camera },
  { key: 'quality', label: 'Image Quality', icon: Gauge },
  { key: 'enhancement', label: 'Enhancement', icon: Wand2 },
  { key: 'analysis', label: 'AI Analysis', icon: Brain },
  { key: 'result', label: 'Result', icon: CheckCircle2 },
];

const analysisSteps = [
  'Detecting retinal structures',
  'Detecting blood vessels',
  'Detecting abnormal regions',
  'Checking for bleeding',
  'Evaluating retinal condition',
  'Predicting severity',
];

const defaultForm: ScreeningForm = {
  patientId: 'PT-NEW-011',
  patientName: '',
  age: '',
  gender: '',
  diabetesStatus: '',
  previousReport: false,
  screeningDate: '2026-09-13',
};

export function Screening() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isDemo = searchParams.get('demo') === 'true';
  const [step, setStep] = useState<ScreeningStep>('patient');
  const [form, setForm] = useState<ScreeningForm>(defaultForm);
  const [image, setImage] = useState<string | null>(null);
  const [qualityScore, setQualityScore] = useState<number | null>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStepIdx, setAnalysisStepIdx] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [edgeMode, setEdgeMode] = useState(false);
  const [edgeProgress, setEdgeProgress] = useState(0);
  const [demoRunning, setDemoRunning] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  function clearTimers() {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }

  function runDemo() {
    clearTimers();
    setDemoRunning(true);
    setForm({
      patientId: 'PT-001',
      patientName: 'James Anderson',
      age: '58',
      gender: 'Male',
      diabetesStatus: 'Type 2',
      previousReport: true,
      screeningDate: '2026-09-13',
    });
    setStep('patient');
    const t1 = setTimeout(() => { setStep('capture'); setImage(FUNDUS_IMAGES[0]); }, 1500);
    const t2 = setTimeout(() => { setStep('quality'); setQualityScore(82); }, 3500);
    const t3 = setTimeout(() => { setStep('enhancement'); setEnhanced(true); }, 5500);
    const t4 = setTimeout(() => { setStep('analysis'); runAnalysis(); }, 7500);
    const t5 = setTimeout(() => { setStep('result'); setDemoRunning(false); }, 15500);
    timersRef.current = [t1, t2, t3, t4, t5];
  }

  function runAnalysis() {
    setAnalysisProgress(0);
    setAnalysisStepIdx(0);
    setAnalysisComplete(false);
    const totalSteps = analysisSteps.length;
    const stepDuration = 1200;
    for (let i = 0; i < totalSteps; i++) {
      const t = setTimeout(() => {
        setAnalysisStepIdx(i);
        setAnalysisProgress(Math.round(((i + 1) / totalSteps) * 100));
        if (i === totalSteps - 1) setAnalysisComplete(true);
      }, (i + 1) * stepDuration);
      timersRef.current.push(t);
    }
  }

  useEffect(() => {
    if (isDemo) runDemo();
    return () => clearTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleCapture() {
    setImage(FUNDUS_IMAGES[Math.floor(Math.random() * FUNDUS_IMAGES.length)]);
  }

  function handleQualityCheck() {
    setQualityScore(82);
  }

  function handleEnhance() {
    setEnhanced(true);
  }

  function toggleEdgeMode() {
    setEdgeMode(true);
    setEdgeProgress(0);
    const interval = setInterval(() => {
      setEdgeProgress((prev) => {
        if (prev >= 78) {
          clearInterval(interval);
          return 78;
        }
        return prev + 4;
      });
    }, 80);
  }

  const currentStepIdx = steps.findIndex(s => s.key === step);
  const qualityStatus = qualityScore !== null
    ? qualityScore < 65 ? 'RETAKE' : qualityScore < 85 ? 'ENHANCE' : 'ACCEPT'
    : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">New Screening</h1>
          <p className="text-sm text-slate-500 mt-1">Complete retinal screening workflow</p>
        </div>
        {!demoRunning && (
          <button onClick={runDemo} className="btn-primary">
            <Play size={16} />
            Run Demo
          </button>
        )}
        {demoRunning && (
          <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-xl text-sm font-medium">
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
            Demo running...
          </div>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="card p-4 sm:p-6">
        <div className="flex items-center justify-between">
          {steps.map((s, idx) => (
            <div key={s.key} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    idx < currentStepIdx
                      ? 'bg-success-500 text-white'
                      : idx === currentStepIdx
                      ? 'bg-primary-600 text-white ring-4 ring-primary-100'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {idx < currentStepIdx ? <CheckCircle2 size={18} /> : <s.icon size={18} />}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${
                  idx === currentStepIdx ? 'text-primary-600' : idx < currentStepIdx ? 'text-success-600' : 'text-slate-400'
                }`}>
                  {s.label}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`h-0.5 flex-1 mx-2 rounded-full transition-all duration-300 ${
                  idx < currentStepIdx ? 'bg-success-400' : 'bg-slate-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="animate-fade-in">
        {step === 'patient' && (
          <PatientStep form={form} setForm={setForm} onNext={() => setStep('capture')} disabled={demoRunning} />
        )}

        {step === 'capture' && (
          <CaptureStep
            image={image}
            onCapture={handleCapture}
            onUpload={handleCapture}
            onRemove={() => setImage(null)}
            onNext={() => { handleQualityCheck(); setStep('quality'); }}
            onBack={() => setStep('patient')}
            disabled={demoRunning}
          />
        )}

        {step === 'quality' && qualityScore !== null && (
          <QualityStep
            image={image!}
            score={qualityScore}
            status={qualityStatus!}
            onRetake={() => { setImage(null); setQualityScore(null); setStep('capture'); }}
            onEnhance={() => { handleEnhance(); setStep('enhancement'); }}
            onAccept={() => { setStep('analysis'); runAnalysis(); }}
            onBack={() => setStep('capture')}
            disabled={demoRunning}
          />
        )}

        {step === 'enhancement' && (
          <EnhancementStep
            image={image!}
            enhanced={enhanced}
            onEnhance={handleEnhance}
            onNext={() => { setStep('analysis'); runAnalysis(); }}
            onBack={() => setStep('quality')}
            edgeMode={edgeMode}
            edgeProgress={edgeProgress}
            onToggleEdge={toggleEdgeMode}
            disabled={demoRunning}
          />
        )}

        {step === 'analysis' && (
          <AnalysisStep
            image={image!}
            progress={analysisProgress}
            stepIdx={analysisStepIdx}
            complete={analysisComplete}
            onNext={() => setStep('result')}
          />
        )}

        {step === 'result' && (
          <ResultStep
            image={image!}
            form={form}
            onNewScreening={() => {
              setStep('patient');
              setForm(defaultForm);
              setImage(null);
              setQualityScore(null);
              setEnhanced(false);
              setAnalysisComplete(false);
              setAnalysisProgress(0);
              navigate('/screening');
            }}
            onDoctorReview={() => navigate('/doctor-review')}
            onGenerateReport={() => navigate('/reports')}
          />
        )}
      </div>
    </div>
  );
}

function Play({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

// --- Patient Step ---
function PatientStep({ form, setForm, onNext, disabled }: {
  form: ScreeningForm;
  setForm: (f: ScreeningForm) => void;
  onNext: () => void;
  disabled: boolean;
}) {
  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-1">Step 1 — Patient Information</h2>
      <p className="text-sm text-slate-500 mb-6">Enter the patient's details to begin the screening process.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Patient ID</label>
          <input className="input" value={form.patientId} onChange={e => setForm({ ...form, patientId: e.target.value })} disabled={disabled} />
        </div>
        <div>
          <label className="label">Patient Name</label>
          <input className="input" placeholder="Enter patient name" value={form.patientName} onChange={e => setForm({ ...form, patientName: e.target.value })} disabled={disabled} />
        </div>
        <div>
          <label className="label">Age</label>
          <input className="input" type="number" placeholder="Enter age" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} disabled={disabled} />
        </div>
        <div>
          <label className="label">Gender</label>
          <select className="input" value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value as ScreeningForm['gender'] })} disabled={disabled}>
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label className="label">Diabetes Status</label>
          <select className="input" value={form.diabetesStatus} onChange={e => setForm({ ...form, diabetesStatus: e.target.value as ScreeningForm['diabetesStatus'] })} disabled={disabled}>
            <option value="">Select status</option>
            <option value="Type 1">Type 1</option>
            <option value="Type 2">Type 2</option>
            <option value="Pre-diabetic">Pre-diabetic</option>
            <option value="None">None</option>
          </select>
        </div>
        <div>
          <label className="label">Screening Date</label>
          <input className="input" type="date" value={form.screeningDate} onChange={e => setForm({ ...form, screeningDate: e.target.value })} disabled={disabled} />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 rounded accent-primary-600" checked={form.previousReport} onChange={e => setForm({ ...form, previousReport: e.target.checked })} disabled={disabled} />
          <span className="text-sm text-slate-600">Patient has a previous eye report</span>
        </label>
      </div>
      <div className="mt-6 flex justify-end">
        <button onClick={onNext} className="btn-primary" disabled={disabled}>
          Start Screening <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

// --- Capture Step ---
function CaptureStep({ image, onCapture, onUpload, onRemove, onNext, onBack, disabled }: {
  image: string | null;
  onCapture: () => void;
  onUpload: () => void;
  onRemove: () => void;
  onNext: () => void;
  onBack: () => void;
  disabled: boolean;
}) {
  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-1">Step 2 — Retinal Image Capture</h2>
      <p className="text-sm text-slate-500 mb-6">Capture the patient's retinal image using the Fundus Camera and upload it for screening.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {image ? (
            <div className="relative">
              <FundusImage src={image} className="aspect-[4/3]" />
              <button
                onClick={onRemove}
                className="absolute top-3 right-3 p-2 bg-black/50 text-white rounded-xl hover:bg-black/70 transition-colors"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-3 left-3 chip bg-success-500 text-white">
                <CheckCircle2 size={14} />
                Image uploaded successfully
              </div>
            </div>
          ) : (
            <div className="aspect-[4/3] rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center bg-slate-50">
              <Camera size={48} className="text-slate-300 mb-3" />
              <p className="text-sm text-slate-400">No image captured yet</p>
              <p className="text-xs text-slate-400 mt-1">Click "Capture Image" to simulate fundus camera capture</p>
            </div>
          )}
          <div className="mt-4 flex flex-wrap gap-3">
            <button onClick={onCapture} className="btn-primary" disabled={disabled}>
              <Camera size={16} />
              Capture Image
            </button>
            <button onClick={onUpload} className="btn-secondary" disabled={disabled}>
              <Upload size={16} />
              Upload Image
            </button>
            {image && (
              <button onClick={onRemove} className="btn-ghost text-danger-600 hover:bg-danger-50" disabled={disabled}>
                <X size={16} />
                Remove Image
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="card p-4 bg-primary-50/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary-100 text-primary-600 rounded-lg">
                <Camera size={18} />
              </div>
              <p className="font-semibold text-sm text-slate-700">Fundus Camera</p>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Used by the hospital assistant to capture the patient's retinal image. The fundus camera
              provides high-resolution images of the retina for diabetic retinopathy screening.
            </p>
          </div>
          <div className="card p-4">
            <p className="text-xs font-medium text-slate-500 mb-3">CAPTURE STATUS</p>
            {image ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-success-600">
                  <CheckCircle2 size={16} />
                  Image uploaded successfully
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <ImageIcon size={16} />
                  Resolution: 2048 × 1536
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Scan size={16} />
                  Format: Fundus RGB
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-400">Awaiting image capture...</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button onClick={onBack} className="btn-secondary" disabled={disabled}>
          <ArrowLeft size={16} />
          Back
        </button>
        <button onClick={onNext} className="btn-primary" disabled={!image || disabled}>
          Continue <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

// --- Quality Step ---
function QualityStep({ image, score, status, onRetake, onEnhance, onAccept, onBack, disabled }: {
  image: string;
  score: number;
  status: 'RETAKE' | 'ENHANCE' | 'ACCEPT';
  onRetake: () => void;
  onEnhance: () => void;
  onAccept: () => void;
  onBack: () => void;
  disabled: boolean;
}) {
  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-1">Step 3 — Image Quality Assessment</h2>
      <p className="text-sm text-slate-500 mb-6">AI-powered quality analysis of the captured retinal image.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <FundusImage src={image} className="aspect-[4/3]" />
        </div>
        <div className="space-y-4">
          <div className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-slate-600">Image Quality Score</p>
              <span className={`chip ${
                status === 'ACCEPT' ? 'bg-success-100 text-success-700'
                : status === 'ENHANCE' ? 'bg-warning-100 text-warning-700'
                : 'bg-danger-100 text-danger-700'
              }`}>
                {status}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                  <circle
                    cx="18" cy="18" r="16" fill="none"
                    stroke={status === 'ACCEPT' ? '#1eaf6a' : status === 'ENHANCE' ? '#f59e0b' : '#ef4444'}
                    strokeWidth="3"
                    strokeDasharray={`${score} 100`}
                    pathLength="100"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-slate-800">{score}%</span>
              </div>
              <div>
                <p className="text-sm text-slate-600">
                  {status === 'ACCEPT' && 'The image quality is sufficient for analysis.'}
                  {status === 'ENHANCE' && 'The image is acceptable but requires enhancement before AI analysis.'}
                  {status === 'RETAKE' && 'The retinal image quality is insufficient for reliable analysis. Please capture another image.'}
                </p>
              </div>
            </div>
          </div>

          <div className="card p-4">
            <p className="text-xs font-medium text-slate-500 mb-3">QUALITY METRICS</p>
            <div className="space-y-2">
              {[
                { label: 'Sharpness', value: 78 },
                { label: 'Contrast', value: 65 },
                { label: 'Illumination', value: 88 },
                { label: 'Field of View', value: 92 },
              ].map(m => (
                <div key={m.label} className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 w-24">{m.label}</span>
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-500 rounded-full" style={{ width: `${m.value}%` }} />
                  </div>
                  <span className="text-xs font-medium text-slate-600 w-8 text-right">{m.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-4">
            <p className="text-xs font-medium text-slate-500 mb-2">TECHNOLOGY</p>
            <div className="flex flex-wrap gap-2">
              <span className="chip bg-slate-100 text-slate-600">MATLAB Image Processing Toolbox</span>
              <span className="chip bg-slate-100 text-slate-600">CLAHE</span>
              <span className="chip bg-slate-100 text-slate-600">Image preprocessing</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button onClick={onBack} className="btn-secondary" disabled={disabled}>
          <ArrowLeft size={16} />
          Back
        </button>
        {status === 'RETAKE' && (
          <button onClick={onRetake} className="btn-danger" disabled={disabled}>
            <RefreshCw size={16} />
            Request Retake
          </button>
        )}
        {status === 'ENHANCE' && (
          <button onClick={onEnhance} className="btn-primary" disabled={disabled}>
            <Wand2 size={16} />
            Enhance Image
          </button>
        )}
        {status === 'ACCEPT' && (
          <button onClick={onAccept} className="btn-success" disabled={disabled}>
            Proceed to AI Analysis <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

function RefreshCw({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 2v6h-6" /><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M3 22v-6h6" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    </svg>
  );
}

// --- Enhancement Step ---
function EnhancementStep({ image, enhanced, onEnhance, onNext, onBack, edgeMode, edgeProgress, onToggleEdge, disabled }: {
  image: string;
  enhanced: boolean;
  onEnhance: () => void;
  onNext: () => void;
  onBack: () => void;
  edgeMode: boolean;
  edgeProgress: number;
  onToggleEdge: () => void;
  disabled: boolean;
}) {
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-1">Step 3b — Image Enhancement</h2>
        <p className="text-sm text-slate-500 mb-6">CLAHE enhancement to improve retinal structure visibility.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-2">Original Image</p>
            <FundusImage src={image} className="aspect-[4/3]" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-2">Enhanced Image {enhanced && '✓'}</p>
            {enhanced ? (
              <div className="relative">
                <FundusImage src={image} className="aspect-[4/3]" />
                <div className="absolute inset-0 rounded-2xl bg-orange-200/20 mix-blend-overlay" />
                <div className="absolute inset-0 rounded-2xl ring-2 ring-success-400/50" />
                <div className="absolute bottom-3 left-3 chip bg-success-500 text-white">
                  <CheckCircle2 size={14} />
                  CLAHE Enhanced
                </div>
              </div>
            ) : (
              <div className="aspect-[4/3] rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50">
                <Wand2 size={36} className="text-slate-300" />
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="card p-4 bg-primary-50/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary-100 text-primary-600 rounded-lg">
                <Wand2 size={18} />
              </div>
              <p className="font-semibold text-sm text-slate-700">CLAHE Enhancement</p>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Contrast Limited Adaptive Histogram Equalization (CLAHE) improves local contrast and
              makes retinal structures more readable for AI analysis.
            </p>
          </div>
          <div className="card p-4">
            <p className="text-xs font-medium text-slate-500 mb-2">TECHNOLOGY</p>
            <div className="flex flex-wrap gap-2">
              <span className="chip bg-slate-100 text-slate-600">MATLAB Image Processing Toolbox</span>
              <span className="chip bg-slate-100 text-slate-600">CLAHE</span>
              <span className="chip bg-slate-100 text-slate-600">Image preprocessing</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button onClick={onBack} className="btn-secondary" disabled={disabled}>
            <ArrowLeft size={16} />
            Back
          </button>
          <div className="flex gap-3">
            {!enhanced && (
              <button onClick={onEnhance} className="btn-primary" disabled={disabled}>
                <Wand2 size={16} />
                Enhance Image
              </button>
            )}
            <button onClick={onNext} className="btn-success" disabled={!enhanced || disabled}>
              Continue to AI Analysis <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Edge/Low-Network Mode */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 text-slate-600 rounded-lg">
              <Cpu size={18} />
            </div>
            <div>
              <p className="font-semibold text-sm text-slate-700">Edge / Low-Network Mode</p>
              <p className="text-xs text-slate-500">Simulated prototype feature</p>
            </div>
          </div>
          {edgeMode ? (
            <span className="chip bg-warning-100 text-warning-700">
              <WifiOff size={14} />
              Network: Poor
            </span>
          ) : (
            <span className="chip bg-success-100 text-success-700">
              <Wifi size={14} />
              Network: Good
            </span>
          )}
        </div>

        {!edgeMode ? (
          <p className="text-sm text-slate-500">
            When network connectivity is poor, the system can use a lightweight optimized model for
            faster inference on low-power devices.
          </p>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="w-2 h-2 bg-warning-500 rounded-full animate-pulse" />
              Optimizing AI model for local processing...
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-500">Model optimization</span>
                <span className="text-xs font-medium text-slate-600">{edgeProgress}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-warning-500 rounded-full transition-all duration-100" style={{ width: `${edgeProgress}%` }} />
              </div>
            </div>
            {edgeProgress >= 78 && (
              <div className="flex items-center gap-2 text-sm text-success-600 animate-fade-in">
                <CheckCircle2 size={16} />
                Low-power inference enabled
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              <span className="chip bg-slate-100 text-slate-600">MATLAB Coder</span>
              <span className="chip bg-slate-100 text-slate-600">Edge deployment</span>
            </div>
          </div>
        )}

        {!edgeMode && (
          <button onClick={onToggleEdge} className="btn-secondary mt-4" disabled={disabled}>
            <WifiOff size={16} />
            Simulate Low-Network Mode
          </button>
        )}
      </div>
    </div>
  );
}

// --- Analysis Step ---
function AnalysisStep({ image, progress, stepIdx, complete, onNext }: {
  image: string;
  progress: number;
  stepIdx: number;
  complete: boolean;
  onNext: () => void;
}) {
  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-1">Step 4 — AI Retinal Analysis</h2>
      <p className="text-sm text-slate-500 mb-6">Pretrained CNN model analyzing retinal structures and detecting abnormalities.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="relative">
          <FundusImage src={image} className="aspect-[4/3]" />
          {!complete && (
            <>
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div className="absolute left-0 right-0 h-1 bg-primary-400/60 shadow-lg shadow-primary-400/50 animate-scan-line" />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-primary-900/10" />
            </>
          )}
          {complete && (
            <div className="absolute top-3 left-3 chip bg-success-500 text-white">
              <CheckCircle2 size={14} />
              AI Analysis Complete
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="card p-5">
            <p className="text-sm font-medium text-slate-600 mb-4">Analysis Progress</p>
            <div className="space-y-3">
              {analysisSteps.map((s, idx) => (
                <div key={s} className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                    idx < stepIdx
                      ? 'bg-success-500 text-white'
                      : idx === stepIdx && !complete
                      ? 'bg-primary-600 text-white animate-pulse-soft'
                      : idx <= stepIdx && complete
                      ? 'bg-success-500 text-white'
                      : 'bg-slate-100 text-slate-400'
                  }`}>
                    {idx < stepIdx || (idx <= stepIdx && complete) ? <CheckCircle2 size={14} /> : idx + 1}
                  </div>
                  <span className={`text-sm ${
                    idx < stepIdx || (idx <= stepIdx && complete) ? 'text-slate-700' : idx === stepIdx ? 'text-primary-600 font-medium' : 'text-slate-400'
                  }`}>
                    {s}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-500">Overall Progress</span>
                <span className="text-xs font-medium text-slate-600">{progress}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>

          <div className="card p-4">
            <p className="text-xs font-medium text-slate-500 mb-2">TECHNOLOGY</p>
            <div className="flex flex-wrap gap-2">
              <span className="chip bg-slate-100 text-slate-600">MATLAB Deep Learning Toolbox</span>
              <span className="chip bg-slate-100 text-slate-600">Pretrained CNN Architecture</span>
            </div>
          </div>

          {complete && (
            <button onClick={onNext} className="btn-primary w-full animate-fade-in">
              View Results <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Result Step ---
function ResultStep({ image, form, onNewScreening, onDoctorReview, onGenerateReport }: {
  image: string;
  form: ScreeningForm;
  onNewScreening: () => void;
  onDoctorReview: () => void;
  onGenerateReport: () => void;
}) {
  const stage = 3;
  const confidence = 91;
  const detectedSigns = {
    abnormalSpots: { detected: true, confidence: 89 },
    bleeding: { detected: true, confidence: 94 },
    vesselAbnormalities: { detected: true, confidence: 87 },
    retinalStructure: { detected: true, confidence: 91 },
  };

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Step 5 — AI Screening Result</h2>
            <p className="text-sm text-slate-500">AI screening result — doctor confirmation required</p>
          </div>
          <span className="chip bg-danger-100 text-danger-700">
            <AlertTriangle size={14} />
            AI Screening Result
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <FundusImage src={image} className="aspect-[4/3]" />
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
              <Activity size={16} className="text-primary-500" />
              Patient: {form.patientName || 'James Anderson'} ({form.patientId || 'PT-001'})
            </div>
          </div>
          <div className="card p-5 bg-slate-50/50">
            <p className="text-xs font-medium text-slate-500 mb-3">SEVERITY CLASSIFICATION</p>
            <SeverityScale stage={stage as 0 | 1 | 2 | 3 | 4} confidence={confidence} />
            <div className="mt-4 p-3 bg-danger-50 rounded-xl flex items-start gap-3">
              <AlertTriangle size={18} className="text-danger-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-danger-700">High-Risk Screening Result</p>
                <p className="text-xs text-danger-600 mt-0.5">Doctor review recommended. This is an AI screening result, not a medical diagnosis.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-semibold text-slate-800 mb-4">Detected Retinal Signs</h3>
        <DetectionCards signs={detectedSigns} />
      </div>

      <div className="card p-6">
        <h3 className="font-semibold text-slate-800 mb-4">AI Explainability — Retinal Heatmap</h3>
        <HeatmapViewer src={image} />
      </div>

      {form.previousReport && (
        <div className="card p-6">
          <h3 className="font-semibold text-slate-800 mb-4">Previous vs Current Screening</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="card p-4">
              <p className="text-xs font-medium text-slate-500 mb-2">PREVIOUS REPORT</p>
              <p className="text-sm text-slate-600">Date: 2026-06-10</p>
              <p className="text-sm text-slate-600 mt-1">Stage: Stage 2 — Moderate</p>
              <p className="text-xs text-slate-500 mt-2">Key findings: Moderate retinopathy, some abnormal vessels detected.</p>
            </div>
            <div className="card p-4 border-danger-200 bg-danger-50/30">
              <p className="text-xs font-medium text-danger-500 mb-2">CURRENT REPORT</p>
              <p className="text-sm text-slate-600">Date: 2026-09-13</p>
              <p className="text-sm text-slate-600 mt-1">Stage: Stage 3 — Severe</p>
              <p className="text-xs text-slate-500 mt-2">Key findings: Severe abnormalities, bleeding and vessel changes detected.</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center gap-4">
            <span className="chip bg-warning-100 text-warning-700">Previous: Stage 2</span>
            <ArrowRight size={20} className="text-danger-500" />
            <span className="chip bg-danger-100 text-danger-700">Current: Stage 3</span>
            <span className="chip bg-danger-200 text-danger-800">Possible progression detected</span>
          </div>
          <p className="mt-3 text-center text-xs text-slate-500">Requires doctor review.</p>
        </div>
      )}

      <div className="flex flex-wrap gap-3 justify-end">
        <button onClick={onNewScreening} className="btn-secondary">
          New Screening
        </button>
        <button onClick={onGenerateReport} className="btn-secondary">
          <FileText size={16} />
          Generate Report
        </button>
        <button onClick={onDoctorReview} className="btn-primary">
          <Stethoscope size={16} />
          Send to Doctor Review
        </button>
      </div>
    </div>
  );
}
