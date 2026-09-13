import {
  Users, Activity, Eye, AlertOctagon, Stethoscope, Clock,
} from 'lucide-react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, LineChart, Line, Legend,
} from 'recharts';
import { StatCard } from '@/components/StatCard';
import { analyticsData, doctors } from '@/data/mockData';

export function Analytics() {
  const availableDoctors = doctors.filter(d => d.available).length;
  const patientsRequiringReview = 6;
  const avgReviews = Math.round(doctors.reduce((sum, d) => sum + d.reviewsCompleted, 0) / doctors.length);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Hospital Analytics</h1>
        <p className="text-sm text-slate-500 mt-1">Screening statistics and healthcare resource insights</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard label="Total Screened" value={analyticsData.totalScreened} icon={Users} color="primary" />
        <StatCard label="Diabetes Patients" value={analyticsData.diabetesPatients} icon={Activity} color="teal" />
        <StatCard label="Eye Problems" value={analyticsData.patientsWithEyeProblems} icon={Eye} color="warning" />
        <StatCard label="High-Risk" value={analyticsData.highRiskPatients} icon={AlertOctagon} color="danger" />
        <StatCard label="Referrals" value={analyticsData.doctorReferrals} icon={Stethoscope} color="slate" />
        <StatCard label="Pending Reviews" value={analyticsData.pendingReviews} icon={Clock} color="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Diabetic Eye Problem Distribution</h3>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="50%" height={220}>
              <PieChart>
                <Pie data={analyticsData.distribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={2}>
                  {analyticsData.distribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {analyticsData.distribution.map((d) => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-sm text-slate-600 flex-1">{d.name}</span>
                  <span className="text-sm font-medium text-slate-700">{d.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Severity Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={analyticsData.severityBars}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="stage" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} cursor={{ fill: '#f8fafc' }} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {analyticsData.severityBars.map((_, i) => (
                  <Cell key={i} fill={analyticsData.distribution[i].color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card p-5">
        <h3 className="font-semibold text-slate-800 mb-4">Screening Trend</h3>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={analyticsData.screeningTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
            <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
            <Line type="monotone" dataKey="screenings" stroke="#339eff" strokeWidth={3} dot={{ r: 5, fill: '#339eff' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Doctor Workload</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <span className="text-sm text-slate-600">Available Doctors</span>
              <span className="text-lg font-bold text-slate-800">{availableDoctors}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-warning-50 rounded-xl">
              <span className="text-sm text-slate-600">Patients Requiring Review</span>
              <span className="text-lg font-bold text-warning-700">{patientsRequiringReview}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-primary-50 rounded-xl">
              <span className="text-sm text-slate-600">Average Reviews per Doctor</span>
              <span className="text-lg font-bold text-primary-700">{avgReviews}</span>
            </div>
          </div>
        </div>

        <div className="card p-5 bg-primary-50/30">
          <h3 className="font-semibold text-slate-800 mb-2">Healthcare Resource Recommendation</h3>
          <p className="text-xs text-slate-500 mb-4">
            Based on the current screening volume and number of high-risk cases, additional ophthalmology
            resources may be required.
          </p>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 bg-white rounded-xl">
                <p className="text-xs text-slate-400">Current Doctors</p>
                <p className="text-2xl font-bold text-slate-800">{doctors.length}</p>
              </div>
              <div className="p-3 bg-white rounded-xl">
                <p className="text-xs text-slate-400">Recommended</p>
                <p className="text-2xl font-bold text-primary-600">6</p>
              </div>
              <div className="p-3 bg-danger-50 rounded-xl">
                <p className="text-xs text-danger-400">Additional</p>
                <p className="text-2xl font-bold text-danger-600">+2</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 bg-white rounded-xl">
                <p className="text-xs text-slate-400">Current Assistants</p>
                <p className="text-2xl font-bold text-slate-800">5</p>
              </div>
              <div className="p-3 bg-white rounded-xl">
                <p className="text-xs text-slate-400">Recommended</p>
                <p className="text-2xl font-bold text-primary-600">7</p>
              </div>
              <div className="p-3 bg-danger-50 rounded-xl">
                <p className="text-xs text-danger-400">Additional</p>
                <p className="text-2xl font-bold text-danger-600">+2</p>
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-400 italic">
            AI-assisted resource planning estimate — not an automatic government decision.
          </p>
        </div>
      </div>
    </div>
  );
}
