import api from './api';
import type { 
  Candidate, 
  CreateCandidateData, 
  UpdateCandidateData, 
  CandidateListResponse, 
  CandidateStatisticsResponse 
} from '../types/candidate';

export const candidateService = {
  // Get all candidates with pagination and filters
  async getCandidates(params: {
    page?: number;
    per_page?: number;
    search?: string;
    status?: string;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
  } = {}): Promise<CandidateListResponse> {
    const response = await api.get('/candidates', { params });
    return response.data;
  },

  // Get a single candidate
  async getCandidate(id: number): Promise<{ success: boolean; data: Candidate }> {
    const response = await api.get(`/candidates/${id}`);
    return response.data;
  },

  // Create a new candidate
  async createCandidate(data: CreateCandidateData): Promise<{ success: boolean; data: Candidate; message: string }> {
    const formData = new FormData();
    
    // Add all form fields - always send required fields
    Object.keys(data).forEach(key => {
      const value = (data as any)[key];
      
      // Always send required fields (first_name, last_name, email, status)
      if (['first_name', 'last_name', 'email', 'status'].includes(key)) {
        formData.append(key, String(value || ''));
      }
      // Send other fields only if they have values
      else if (value !== undefined && value !== null && value !== '') {
        if (key === 'resume' && value instanceof File) {
          formData.append('resume', value);
        } else if (key === 'expected_salary' && typeof value === 'number') {
          formData.append(key, value.toString());
        } else {
          formData.append(key, String(value));
        }
      }
    });

    const response = await api.post('/candidates', formData);
    return response.data;
  },

  // Update a candidate
  async updateCandidate(id: number, data: UpdateCandidateData): Promise<{ success: boolean; data: Candidate; message: string }> {
    const formData = new FormData();
    
    // Add all form fields - always send required fields
    Object.keys(data).forEach(key => {
      const value = (data as any)[key];
      
      // Always send required fields (first_name, last_name, email, status)
      if (['first_name', 'last_name', 'email', 'status'].includes(key)) {
        formData.append(key, String(value || ''));
      }
      // Send other fields only if they have values
      else if (value !== undefined && value !== null && value !== '') {
        if (key === 'resume' && value instanceof File) {
          formData.append('resume', value);
        } else if (key === 'expected_salary' && typeof value === 'number') {
          formData.append(key, value.toString());
        } else {
          formData.append(key, String(value));
        }
      }
    });

    const response = await api.put(`/candidates/${id}`, formData);
    return response.data;
  },

  // Delete a candidate
  async deleteCandidate(id: number): Promise<{ success: boolean; message: string }> {
    const response = await api.delete(`/candidates/${id}`);
    return response.data;
  },

  // Get candidate statistics
  async getStatistics(): Promise<CandidateStatisticsResponse> {
    const response = await api.get('/candidates-statistics');
    return response.data;
  },
}; 