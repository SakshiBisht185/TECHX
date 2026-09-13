import { Camera, Brain, Cpu, Code, Eye, Shield, Bell, User } from 'lucide-react';

const techStack = [
  { category: 'Hardware', icon: Camera, items: ['Fundus Camera'] },
  { category: 'Image Processing', icon: Eye, items: ['MATLAB', 'MATLAB Image Processing Toolbox', 'CLAHE'] },
  { category: 'Deep Learning', icon: Brain, items: ['MATLAB Deep Learning Toolbox', 'Pretrained CNN'] },
  { category: 'Explainable AI', icon: Shield, items: ['Grad-CAM', 'Grad-CAM++'] },
  { category: 'Edge Deployment', icon: Cpu, items: ['MATLAB Coder'] },
  { category: 'Frontend Prototype', icon: Code, items: ['React', 'React Router', 'Tailwind CSS', 'Recharts'] },
];

export function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Application configuration and technology stack</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary-50 text-primary-600 rounded-lg"><User size={18} /></div>
            <h3 className="font-semibold text-slate-800">Profile Settings</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="label">Display Name</label>
              <input className="input" defaultValue="Karen Allen" />
            </div>
            <div>
              <label className="label">Email</label>
              <input className="input" defaultValue="karen.allen@stmaryregional.org" />
            </div>
            <div>
              <label className="label">Role</label>
              <input className="input" defaultValue="Hospital Assistant" disabled />
            </div>
            <button className="btn-primary">Save Changes</button>
          </div>
        </div>

        <div className="card p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-teal-50 text-teal-600 rounded-lg"><Bell size={18} /></div>
            <h3 className="font-semibold text-slate-800">Notification Preferences</h3>
          </div>
          <div className="space-y-3">
            {[
              'High-risk patient alerts',
              'AI analysis completion',
              'Image retake requests',
              'Previous report comparisons',
              'Hospital workload warnings',
            ].map((pref, i) => (
              <label key={pref} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer">
                <span className="text-sm text-slate-600">{pref}</span>
                <input type="checkbox" defaultChecked={i < 4} className="w-4 h-4 rounded accent-primary-600" />
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="card p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-slate-100 text-slate-600 rounded-lg"><Code size={18} /></div>
          <h3 className="font-semibold text-slate-800">Technology Stack</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {techStack.map(ts => (
            <div key={ts.category} className="p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <ts.icon size={16} className="text-slate-500" />
                <p className="text-sm font-medium text-slate-700">{ts.category}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {ts.items.map(item => (
                  <span key={item} className="chip bg-white text-slate-600 text-xs">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-warning-50 text-warning-600 rounded-lg"><Shield size={18} /></div>
          <h3 className="font-semibold text-slate-800">Medical Safety / Prototype Disclaimer</h3>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl">
          <p className="text-sm text-slate-600 leading-relaxed">
            Prototype for research and hackathon demonstration only. AI results are screening
            assistance and are not a substitute for professional medical diagnosis. Final assessment
            should be performed by a qualified healthcare professional.
          </p>
          <p className="text-xs text-slate-400 mt-3">
            MATLAB/CNN inference is simulated using mock data for this prototype. All patient data is
            fictional and for demonstration purposes only.
          </p>
        </div>
      </div>
    </div>
  );
}
