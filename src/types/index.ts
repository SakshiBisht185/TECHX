export type SeverityStage = 0 | 1 | 2 | 3 | 4;

export type ScreeningStatus =
  | 'Normal'
  | 'Mild'
  | 'Moderate'
  | 'Severe'
  | 'Critical'
  | 'Awaiting Doctor Review';

export type ImageQualityStatus = 'RETAKE' | 'ENHANCE' | 'ACCEPT';

export type DoctorReviewStatus =
  | 'Confirmed'
  | 'Requires Further Examination'
  | 'Re-scan Required'
  | 'No Significant Finding'
  | 'Pending';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  diabetesStatus: 'Type 1' | 'Type 2' | 'Pre-diabetic' | 'None';
  lastScreening: string;
  currentStage: SeverityStage;
  previousStage: SeverityStage | null;
  imageQuality: number;
  aiConfidence: number;
  doctorReview: DoctorReviewStatus;
  status: ScreeningStatus;
  hasPreviousReport: boolean;
  fundusImage: string;
  screeningDate: string;
  detectedSigns: DetectedSigns;
}

export interface DetectedSigns {
  abnormalSpots: { detected: boolean; confidence: number };
  bleeding: { detected: boolean; confidence: number };
  vesselAbnormalities: { detected: boolean; confidence: number };
  retinalStructure: { detected: boolean; confidence: number };
}

export interface ScreeningHistoryEntry {
  date: string;
  stage: SeverityStage;
  confidence: number;
  doctorReview: DoctorReviewStatus;
  findings: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  available: boolean;
  patientsAssigned: number;
  reviewsCompleted: number;
}

export interface Notification {
  id: string;
  type: 'high-risk' | 'new-screening' | 'retake' | 'ai-complete' | 'comparison' | 'workload';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface Hospital {
  id: string;
  name: string;
  location: string;
  patientsScreened: number;
  diabeticEyeCases: number;
  highRiskCases: number;
  doctors: number;
  recommendedDoctors: number;
  assistants: number;
  recommendedAssistants: number;
}

export interface ScreeningForm {
  patientId: string;
  patientName: string;
  age: string;
  gender: 'Male' | 'Female' | '';
  diabetesStatus: 'Type 1' | 'Type 2' | 'Pre-diabetic' | 'None' | '';
  previousReport: boolean;
  screeningDate: string;
}

export type ScreeningStep =
  | 'patient'
  | 'capture'
  | 'quality'
  | 'enhancement'
  | 'analysis'
  | 'result';
