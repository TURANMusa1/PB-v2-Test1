export interface Candidate {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  date_of_birth?: string;
  position_applied?: string;
  experience_summary?: string;
  current_company?: string;
  current_position?: string;
  expected_salary?: number;
  resume_path?: string;
  status: 'new' | 'reviewed' | 'shortlisted' | 'interviewed' | 'hired' | 'rejected';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCandidateData {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  date_of_birth?: string;
  position_applied?: string;
  experience_summary?: string;
  current_company?: string;
  current_position?: string;
  expected_salary?: number;
  status?: string;
  notes?: string;
}

export interface UpdateCandidateData extends Partial<CreateCandidateData> {}

export interface CandidateListResponse {
  success: boolean;
  data: Candidate[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface CandidateStatistics {
  total: number;
  by_status: Record<string, number>;
  recent: Candidate[];
}

export interface CandidateStatisticsResponse {
  success: boolean;
  data: CandidateStatistics;
} 