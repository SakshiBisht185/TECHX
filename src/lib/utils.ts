import type { SeverityStage, ScreeningStatus, DoctorReviewStatus } from '@/types';

export const stageLabels: Record<SeverityStage, string> = {
  0: 'No Diabetic Retinopathy',
  1: 'Mild',
  2: 'Moderate',
  3: 'Severe',
  4: 'Proliferative / Critical',
};

export const stageShort: Record<SeverityStage, string> = {
  0: 'Stage 0',
  1: 'Stage 1',
  2: 'Stage 2',
  3: 'Stage 3',
  4: 'Stage 4',
};

export const stageColors: Record<SeverityStage, string> = {
  0: '#12a88f',
  1: '#fbbf24',
  2: '#f59e0b',
  3: '#ef4444',
  4: '#b91c1c',
};

export const stageBg: Record<SeverityStage, string> = {
  0: 'bg-success-100 text-success-700',
  1: 'bg-warning-100 text-warning-700',
  2: 'bg-warning-200 text-warning-800',
  3: 'bg-danger-100 text-danger-700',
  4: 'bg-danger-200 text-danger-800',
};

export function statusToStage(status: ScreeningStatus): SeverityStage {
  const map: Record<ScreeningStatus, SeverityStage> = {
    Normal: 0, Mild: 1, Moderate: 2, Severe: 3, Critical: 4,
    'Awaiting Doctor Review': 3,
  };
  return map[status];
}

export function reviewBadgeClass(status: DoctorReviewStatus): string {
  switch (status) {
    case 'Confirmed': return 'bg-success-100 text-success-700';
    case 'Requires Further Examination': return 'bg-warning-100 text-warning-700';
    case 'Re-scan Required': return 'bg-danger-100 text-danger-700';
    case 'No Significant Finding': return 'bg-teal-100 text-teal-700';
    case 'Pending': return 'bg-slate-100 text-slate-600';
  }
}

export function statusBadgeClass(status: ScreeningStatus): string {
  switch (status) {
    case 'Normal': return 'bg-success-100 text-success-700';
    case 'Mild': return 'bg-warning-100 text-warning-700';
    case 'Moderate': return 'bg-warning-200 text-warning-800';
    case 'Severe': return 'bg-danger-100 text-danger-700';
    case 'Critical': return 'bg-danger-200 text-danger-800';
    case 'Awaiting Doctor Review': return 'bg-primary-100 text-primary-700';
  }
}

export function qualityStatus(score: number): 'RETAKE' | 'ENHANCE' | 'ACCEPT' {
  if (score < 65) return 'RETAKE';
  if (score < 85) return 'ENHANCE';
  return 'ACCEPT';
}
