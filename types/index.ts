export interface User {
  id: string;
  email: string;
  role: 'Sales Rep' | 'Sales Manager' | 'Admin';
  first_name: string;
  last_name: string;
  phone?: string;
  availability_status: 'available' | 'busy' | 'offline';
  max_lead_capacity: number;
  current_lead_count: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Lead {
  id: string;
  user_id: string;
  assigned_rep_id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  company_name?: string;
  company_size?: 'Small' | 'Medium' | 'Large' | 'Enterprise';
  industry?: string;
  email_domain?: string;
  status: 'new' | 'contacted' | 'qualified' | 'unqualified' | 'converted' | 'lost';
  source?: string;
  hubspot_id?: string;
  salesforce_id?: string;
  total_score: number;
  score_tier?: 'Low' | 'Medium' | 'High' | 'Hot';
  qualification_notes?: string;
  chatbot_conversation_id?: string;
  last_contacted_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface LeadTag {
  id: string;
  user_id: string;
  lead_id: string;
  tag_name: string;
  tag_type: 'auto' | 'manual';
  created_at: Date;
  updated_at: Date;
}

export interface LeadRequestedItem {
  id: string;
  user_id: string;
  lead_id: string;
  item_name: string;
  item_category?: string;
  estimated_value?: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  created_at: Date;
  updated_at: Date;
}

export interface ScoringRule {
  id: string;
  user_id: string;
  rule_type: 'email_domain' | 'phone_pattern' | 'company_size' | 'requested_item' | 'industry';
  rule_name: string;
  criteria: Record<string, any>;
  score_value: number;
  weight: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface LeadScore {
  id: string;
  user_id: string;
  lead_id: string;
  scoring_rule_id: string;
  score_value: number;
  calculated_at: Date;
  created_at: Date;
  updated_at: Date;
}

export interface AssignmentRule {
  id: string;
  user_id: string;
  rule_name: string;
  score_threshold_min: number;
  score_threshold_max?: number;
  assignment_strategy: 'round_robin' | 'lowest_load' | 'random' | 'skill_based';
  eligible_rep_ids?: string[];
  priority: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface SmsNotification {
  id: string;
  user_id: string;
  lead_id: string;
  recipient_user_id: string;
  phone_number: string;
  message_body: string;
  twilio_sid?: string;
  status: 'pending' | 'sent' | 'delivered' | 'failed';
  error_message?: string;
  sent_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface ChatbotConversation {
  id: string;
  user_id: string;
  lead_id?: string;
  session_id: string;
  ai_provider: 'chatgpt' | 'claude';
  conversation_data: Record<string, any>;
  qualification_score?: number;
  qualification_summary?: string;
  status: 'active' | 'completed' | 'abandoned';
  completed_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export type Database = {
  users: User;
  leads: Lead;
  lead_tags: LeadTag;
  lead_requested_items: LeadRequestedItem;
  scoring_rules: ScoringRule;
  lead_scores: LeadScore;
  assignment_rules: AssignmentRule;
  sms_notifications: SmsNotification;
  chatbot_conversations: ChatbotConversation;
};