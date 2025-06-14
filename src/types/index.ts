export interface User {
  id: string;
  name: string;
  email: string;
  auth_type: 'google' | 'password';
  subscription_tier: 'free' | 'pro' | 'enterprise';
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: string;
  user_id: string;
  name: string;
  industry_focus_area: string;
  mission_statement: string;
  contact_person: string;
  contact_info: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface Grant {
  id: string;
  funding_opportunity_number: string;
  category: string;
  posted_date: string;
  deadline: string;
  total_funding: number;
  max_award_amount: number;
  eligibility: string;
  program_summary: string;
  application_link: string;
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: string;
  client_id: string;
  grant_id: string;
  title: string;
  status: 'draft' | 'in_progress' | 'submitted' | 'approved' | 'rejected';
  deadline: string;
  created_at: string;
  updated_at: string;
}

export interface DraftSection {
  id: string;
  application_id: string;
  section_type: string;
  content: string;
  order: number;
  created_at: string;
  updated_at: string;
} 