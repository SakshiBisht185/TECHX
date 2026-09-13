import { useNavigate } from 'react-router-dom';
import {
  Users, Image, CheckCircle2, AlertTriangle, AlertOctagon, Stethoscope, Play, ArrowRight,
} from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { StatusBadge, ReviewBadge, QualityBadge } from '@/components/StatusBadge';
import { patients, doctors, analyticsData } from '@/data/mockData';

export function Dashboard() {
  const navigate = useNavigate();
  const availableDoctors = doctors.filter(d => d.available).length;
  const highRisk = patients.filter(p => p.currentStage >= 3).length;
  const normalResults = patients.filter(p => p.currentStage === 0).length;
  const drCases = patients.filter(p => p.currentStage > 0).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Overview of screening activity and hospital status</p>
        </div>
        <button
          onClick={() => navigate('/screening?demo=true')}
          className="btn-primary"
        >
          <Play size={16} />
          Run Demo
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard label="Patients Screened" value={analyticsData.totalScreened} icon={Users} color="primary" />
        <StatCard label="Images Processed" value={analyticsData.totalScreened * 2} icon={Image} color="teal" />
        <StatCard label="Normal Results" value={analyticsData.distribution[0].value} icon={CheckCircle2} color="success" />
        <StatCard label="DR Cases" value={analyticsData.patientsWithEyeProblems} icon={AlertTriangle} color="warning" />
        <StatCard label="High-Risk Cases" value={analyticsData.highRiskPatients} icon={AlertOctagon} color="danger" />
        <StatCard label="Doctors Available" value={availableDoctors} icon={Stethoscope} color="slate" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800">Recent Screenings</h2>
            <button
              onClick={() => navigate('/patients')}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
            >
              View All <ArrowRight size={14} />
            </button>
          </div>
          <div className="overflow-x-auto -mx-5 px-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-400 border-b border-slate-100">
                  <th className="pb-3 pr-4 font-medium">Patient ID</th>
                  <th className="pb-3 pr-4 font-medium">Name</th>
                  <th className="pb-3 pr-4 font-medium">Age</th>
                  <th className="pb-3 pr-4 font-medium">Date</th>
                  <th className="pb-3 pr-4 font-medium">Quality</th>
                  <th className="pb-3 pr-4 font-medium">Severity</th>
                  <th className="pb-3 pr-4 font-medium">Review</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {patients.slice(0, 8).map((p) => (
                  <tr
                    key={p.id}
                    onClick={() => navigate(`/patients/${p.id}`)}
                    className="cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-3 pr-4 font-medium text-slate-600">{p.id}</td>
                    <td className="py-3 pr-4 text-slate-700">{p.name}</td>
                    <td className="py-3 pr-4 text-slate-500">{p.age}</td>
                    <td className="py-3 pr-4 text-slate-500">{p.lastScreening}</td>
                    <td className="py-3 pr-4"><QualityBadge score={p.imageQuality} /></td>
                    <td className="py-3 pr-4"><StatusBadge status={p.status} /></td>
                    <td className="py-3 pr-4"><ReviewBadge status={p.doctorReview} /></td>
                    <td className="py-3">
                      <span className={`chip ${
                        p.status === 'Normal' ? 'bg-success-100 text-success-700'
                        : p.status === 'Awaiting Doctor Review' ? 'bg-primary-100 text-primary-700'
                        : 'bg-warning-100 text-warning-700'
                      }`}>
                        {p.status === 'Normal' ? 'Completed' : p.status === 'Awaiting Doctor Review' ? 'Pending' : 'Reviewed'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card p-5">
          <h2 className="font-semibold text-slate-800 mb-4">Quick Summary</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-success-50 rounded-xl">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-success-600" />
                <span className="text-sm text-slate-600">Normal Results</span>
              </div>
              <span className="text-lg font-bold text-success-700">{normalResults}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-warning-50 rounded-xl">
              <div className="flex items-center gap-3">
                <AlertTriangle size={20} className="text-warning-600" />
                <span className="text-sm text-slate-600">DR Cases</span>
              </div>
              <span className="text-lg font-bold text-warning-700">{drCases}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-danger-50 rounded-xl">
              <div className="flex items-center gap-3">
                <AlertOctagon size={20} className="text-danger-600" />
                <span className="text-sm text-slate-600">High-Risk</span>
              </div>
              <span className="text-lg font-bold text-danger-700">{highRisk}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-primary-50 rounded-xl">
              <div className="flex items-center gap-3">
                <Stethoscope size={20} className="text-primary-600" />
                <span className="text-sm text-slate-600">Pending Reviews</span>
              </div>
              <span className="text-lg font-bold text-primary-700">{analyticsData.pendingReviews}</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/screening')}
            className="btn-primary w-full mt-5"
          >
            New Screening
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
