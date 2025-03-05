/**
 * User role types
 */
export enum UserRole {
  USER = 'USER',
  COUNSELLOR = 'COUNSELLOR',
  ADMIN = 'ADMIN',
}

/**
 * Counselling field categories
 */
export enum CounsellingField {
  MENTAL_HEALTH = 'Mental Health',
  CAREER_GUIDANCE = 'Career Guidance',
  FINANCIAL_ADVICE = 'Financial Advice',
  RELATIONSHIP = 'Relationship',
  EDUCATION = 'Education',
  HEALTH_WELLNESS = 'Health & Wellness',
  LEGAL_ADVICE = 'Legal Advice',
  SPIRITUAL_GUIDANCE = 'Spiritual Guidance',
  PARENTING = 'Parenting',
  OTHER = 'Other',
}

/**
 * Session status types
 */
export enum SessionStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  MISSED = 'MISSED',
}

/**
 * User interface
 */
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Counsellor profile interface
 */
export interface CounsellorProfile {
  id: string;
  userId: string;
  bio: string;
  fields: CounsellingField[];
  experience: number; // Years of experience
  education: string[];
  certifications: string[];
  hourlyRate: number;
  availability: Availability[];
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Availability interface
 */
export interface Availability {
  id: string;
  counsellorId: string;
  dayOfWeek: number; // 0-6, where 0 is Sunday
  startTime: string; // Format: "HH:MM"
  endTime: string; // Format: "HH:MM"
}

/**
 * Session interface
 */
export interface Session {
  id: string;
  userId: string;
  counsellorId: string;
  startTime: Date;
  endTime: Date;
  status: SessionStatus;
  isAnonymous: boolean;
  notes?: string;
  rating?: number;
  feedback?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Forum post interface
 */
export interface ForumPost {
  id: string;
  userId: string;
  title: string;
  content: string;
  field: CounsellingField;
  likes: number;
  commentCount: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Forum comment interface
 */
export interface ForumComment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Emergency contact interface
 */
export interface EmergencyContact {
  id: string;
  userId: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
} 