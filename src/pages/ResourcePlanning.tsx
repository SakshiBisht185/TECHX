import { MapPin, Users, AlertTriangle, CheckCircle2, TrendingUp, Building2 } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { hospitals } from '@/data/mockData';

export function ResourcePlanning() {
  const chartData = hospitals.map(h => ({
    name: h.name.split(' — ')[0],
    Screened: h.patientsScreened,
    'DR Cases': h.diabeticEyeCases,
    'High-Risk': h.highRiskCases,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Resource Planning</h1>
        <p className="text-sm text-slate-500 mt-1">
          Aggregated screening statistics for hospital administrators to identify locations needing additional resources
        </p>
      </div>

      <div className="card p-5">
        <h3 className="font-semibold text-slate-800 mb-4">Hospital Comparison</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }} />
            <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} cursor={{ fill: '#f8fafc' }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="Screened" fill="#339eff" radius={[4, 4, 0, 0]} />
            <Bar dataKey="DR Cases" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            <Bar dataKey="High-Risk" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {hospitals.map(h => {
          const needsMore = h.recommendedDoctors > h.doctors;
          const needsMoreAssistants = h.recommendedAssistants > h.assistants;
          return (
            <div key={h.id} className="card p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-50 text-primary-600 rounded-xl">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{h.name}</p>
                    <p className="text-xs text-slate-400 flex items-center gap-1"><MapPin size={12} /> {h.location}</p>
                  </div>
                </div>
                {needsMore ? (
                  <span className="chip bg-danger-100 text-danger-700">
                    <AlertTriangle size={14} />
                    Additional resources recommended
                  </span>
                ) : (
                  <span className="chip bg-success-100 text-success-700">
                    <CheckCircle2 size={14} />
                    Resources adequate
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="p-3 bg-slate-50 rounded-xl text-center">
                  <p className="text-xs text-slate-400">Patients Screened</p>
                  <p className="text-xl font-bold text-slate-800">{h.patientsScreened.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-warning-50 rounded-xl text-center">
                  <p className="text-xs text-slate-400">DR Eye Cases</p>
                  <p className="text-xl font-bold text-warning-700">{h.diabeticEyeCases}</p>
                </div>
                <div className="p-3 bg-danger-50 rounded-xl text-center">
                  <p className="text-xs text-slate-400">High-Risk</p>
                  <p className="text-xl font-bold text-danger-700">{h.highRiskCases}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-slate-400" />
                    <span className="text-sm text-slate-600">Doctors</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-500">Current: <span className="font-semibold text-slate-700">{h.doctors}</span></span>
                    <span className="text-sm text-slate-500">Recommended: <span className="font-semibold text-primary-600">{h.recommendedDoctors}</span></span>
                    {needsMore && (
                      <span className="chip bg-danger-100 text-danger-700 text-xs">
                        <TrendingUp size={12} />
                        +{h.recommendedDoctors - h.doctors}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-slate-400" />
                    <span className="text-sm text-slate-600">Assistants</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-500">Current: <span className="font-semibold text-slate-700">{h.assistants}</span></span>
                    <span className="text-sm text-slate-500">Recommended: <span className="font-semibold text-primary-600">{h.recommendedAssistants}</span></span>
                    {needsMoreAssistants && (
                      <span className="chip bg-danger-100 text-danger-700 text-xs">
                        <TrendingUp size={12} />
                        +{h.recommendedAssistants - h.assistants}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card p-4 bg-slate-50">
        <p className="text-sm text-slate-500 leading-relaxed">
          <span className="font-medium text-slate-600">Important:</span> Resource recommendations are
          based on screening workload data and are intended for administrative planning. They do not
          represent automatic decisions and should be reviewed by hospital management.
        </p>
      </div>
    </div>
  );
}
