import type { JSX } from "react";

export interface User {
  userId?: string;
  fullName: string;
  email: string;
  phone: string;
  profileImage: string;
  role: string;
  password?: string;
}

export interface Company {
  companyId: number;
  companyName: string;
  address: string;
  industry: string;
  companySize: string;
  isBlocked: boolean;
  website: string;
  description: string;
  createdAt: string;
  user: User;
}

export interface SideNavItem {
  title: string;
  path: string;
  icon?: JSX.Element;
}

export interface Job {
  companyId: string;
  jobId?: number;
  company?: Company;
  jobTitle: string;
  jobPosition: string;
  jobLocation: string;
  jobCategory: string;
  jobDescription: string;
  requiredDegrees: string;
  minPackage: number;
  maxPackage: number;
  totalOpenings: number;
  requiredSkills: string;
  requiredExperience: number;
  applicantsCount?: number;
  status: string;
  postedAt?: string;
}

export interface Test {
  testId: number;
  jobId: number;
  testType: string;
  durationMinutes: number;
  createdAt: string;
}

export interface Question {
  questionId: number;
  testId: number;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: string;
}

export interface CodingQuestion {
  codeQuestionId: number;
  testId: number;
  title: string;
  description: string;
  inputFormat: string;
  outputFormat: string;
  difficulty: string;
}

export type AnyQuestion =
  | (Question & { type: "mcq" })
  | (CodingQuestion & { type: "coding" });

export interface Employee {
  employeeId?: number;
  companyId?: string;
  user: User;
}

export interface Candidate {
  candidateId?: number;
  user?: User;
  degree?: string;
  experienceYears?: number;
  skills?: string;
  resumeUrl?: string;
  education?: string;
  experience?: string;
  certifications?: string;
  projects?: string;
  currentJobTitle?: string;
  currentCompany?: string;
  currentSalary?: number;
  expectedSalary?: number;
  noticePeriod?: string;
  resumeHeadline?: string;
  summary?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  preferredLocations?: string;
  employmentType?: string;
  workType?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

interface Applicant {
  applicationId: number;
  status: string;
  createdAt: string;
  candidate: Candidate;
  job: Job;
}

export interface McqQuestion {
  questionId: number;
  category: string;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: string;
  active: boolean;
}

export interface McqSubmitRequest {
  candidateId: number;
  jobId: number;
  answers: {
    questionId: number;
    selectedOption: string;
  }[];
}

export interface Applicant {
  applicationId: number;
  status: string;
  createdAt: string;

  referredByEmployeeId?: number;
  referredByEmployeeName?: string;

  candidate: {
    candidateId: number;
    userId: number;
    fullName: string;
    email: string;
    degree?: string;
    experienceYears?: number;
    resumeUrl?: string;
    currentJobTitle?: string;
    currentCompany?: string;
    skills?: string;
  };

  job: {
    jobId: number;
    jobTitle: string;
    jobType: string;
    minPackage: number;
    maxPackage: number;
    status: string;
    companyId: number;
    companyName: string;
  };
}
