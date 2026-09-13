import type { ScreeningStatus, DoctorReviewStatus } from '@/types';
import { statusBadgeClass, reviewBadgeClass } from '@/lib/utils';

export function StatusBadge({ status }: { status: ScreeningStatus }) {
  return <span className={`chip ${statusBadgeClass(status)}`}>{status}</span>;
}

export function ReviewBadge({ status }: { status: DoctorReviewStatus }) {
  return <span className={`chip ${reviewBadgeClass(status)}`}>{status}</span>;
}

export function QualityBadge({ score }: { score: number }) {
  const cls = score >= 85 ? 'bg-success-100 text-success-700'
    : score >= 65 ? 'bg-warning-100 text-warning-700'
    : 'bg-danger-100 text-danger-700';
  return <span className={`chip ${cls}`}>{score}%</span>;
}
