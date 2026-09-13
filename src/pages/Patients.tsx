import { useNavigate } from 'react-router-dom';
import { Eye, FileText, History, Search } from 'lucide-react';
import { useState } from 'react';
import { patients } from '@/data/mockData';
import { StatusBadge, ReviewBadge, QualityBadge } from '@/components/StatusBadge';
import { stageShort } from '@/lib/utils';

export function Patients() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Patients</h1>
        <p className="text-sm text-slate-500 mt-1">Manage patient records and screening history</p>
      </div>

      <div className="card p-4">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="input pl-10"
            placeholder="Search by patient name or ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="card p-5">
        <div className="overflow-x-auto -mx-5 px-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-400 border-b border-slate-100">
                <th className="pb-3 pr-4 font-medium">Patient ID</th>
                <th className="pb-3 pr-4 font-medium">Name</th>
                <th className="pb-3 pr-4 font-medium">Age</th>
                <th className="pb-3 pr-4 font-medium">Diabetes</th>
                <th className="pb-3 pr-4 font-medium">Last Screening</th>
                <th className="pb-3 pr-4 font-medium">Current Stage</th>
                <th className="pb-3 pr-4 font-medium">Previous</th>
                <th className="pb-3 pr-4 font-medium">Review</th>
                <th className="pb-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 pr-4 font-medium text-slate-600">{p.id}</td>
                  <td className="py-3 pr-4 text-slate-700">{p.name}</td>
                  <td className="py-3 pr-4 text-slate-500">{p.age}</td>
                  <td className="py-3 pr-4"><span className="chip bg-slate-100 text-slate-600">{p.diabetesStatus}</span></td>
                  <td className="py-3 pr-4 text-slate-500">{p.lastScreening}</td>
                  <td className="py-3 pr-4"><StatusBadge status={p.status} /></td>
                  <td className="py-3 pr-4 text-slate-500">{p.previousStage !== null ? stageShort[p.previousStage] : '—'}</td>
                  <td className="py-3 pr-4"><ReviewBadge status={p.doctorReview} /></td>
                  <td className="py-3">
                    <div className="flex gap-1">
                      <button onClick={() => navigate(`/patients/${p.id}`)} className="p-1.5 rounded-lg hover:bg-primary-50 text-primary-600" title="View">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => navigate(`/patients/${p.id}`)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500" title="Screening History">
                        <History size={16} />
                      </button>
                      <button onClick={() => navigate('/reports')} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500" title="Reports">
                        <FileText size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
