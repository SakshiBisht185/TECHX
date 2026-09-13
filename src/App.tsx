import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Landing } from '@/pages/Landing';
import { Dashboard } from '@/pages/Dashboard';
import { Screening } from '@/pages/Screening';
import { Patients } from '@/pages/Patients';
import { PatientProfile } from '@/pages/PatientProfile';
import { Reports } from '@/pages/Reports';
import { DoctorReview } from '@/pages/DoctorReview';
import { Analytics } from '@/pages/Analytics';
import { ResourcePlanning } from '@/pages/ResourcePlanning';
import { Settings } from '@/pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/screening" element={<Screening />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/patients/:id" element={<PatientProfile />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/doctor-review" element={<DoctorReview />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/resource-planning" element={<ResourcePlanning />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
