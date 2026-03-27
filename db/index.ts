import { supabase } from '@/lib/supabase';
import type {
  User,
  Lead,
  LeadTag,
  LeadRequestedItem,
  ScoringRule,
  LeadScore,
  AssignmentRule,
  SmsNotification
} from '@/types';

// Users
export async function getAllUsers(): Promise<User[]> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch users: ${error.message}`);
  return data;
}

export async function getUserById(id: string): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw new Error(`Failed to fetch user: ${error.message}`);
  return data;
}

export async function createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .insert(user)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to create user: ${error.message}`);
  return data;
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to update user: ${error.message}`);
  return data;
}

export async function deleteUser(id: string): Promise<void> {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);
  
  if (error) throw new Error(`Failed to delete user: ${error.message}`);
}

// Leads
export async function getAllLeads(): Promise<Lead[]> {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch leads: ${error.message}`);
  return data;
}

export async function getLeadById(id: string): Promise<Lead> {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw new Error(`Failed to fetch lead: ${error.message}`);
  return data;
}

export async function createLead(lead: Omit<Lead, 'id' | 'created_at' | 'updated_at'>): Promise<Lead> {
  const { data, error } = await supabase
    .from('leads')
    .insert(lead)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to create lead: ${error.message}`);
  return data;
}

export async function updateLead(id: string, updates: Partial<Lead>): Promise<Lead> {
  const { data, error } = await supabase
    .from('leads')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to update lead: ${error.message}`);
  return data;
}

export async function deleteLead(id: string): Promise<void> {
  const { error } = await supabase
    .from('leads')
    .delete()
    .eq('id', id);
  
  if (error) throw new Error(`Failed to delete lead: ${error.message}`);
}

// Lead Tags
export async function getLeadTagsByLeadId(leadId: string): Promise<LeadTag[]> {
  const { data, error } = await supabase
    .from('lead_tags')
    .select('*')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch lead tags: ${error.message}`);
  return data;
}

export async function createLeadTag(tag: Omit<LeadTag, 'id' | 'created_at' | 'updated_at'>): Promise<LeadTag> {
  const { data, error } = await supabase
    .from('lead_tags')
    .insert(tag)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to create lead tag: ${error.message}`);
  return data;
}

export async function deleteLeadTag(id: string): Promise<void> {
  const { error } = await supabase
    .from('lead_tags')
    .delete()
    .eq('id', id);
  
  if (error) throw new Error(`Failed to delete lead tag: ${error.message}`);
}

// Lead Requested Items
export async function getLeadRequestedItemsByLeadId(leadId: string): Promise<LeadRequestedItem[]> {
  const { data, error } = await supabase
    .from('lead_requested_items')
    .select('*')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch lead requested items: ${error.message}`);
  return data;
}

export async function createLeadRequestedItem(item: Omit<LeadRequestedItem, 'id' | 'created_at' | 'updated_at'>): Promise<LeadRequestedItem> {
  const { data, error } = await supabase
    .from('lead_requested_items')
    .insert(item)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to create lead requested item: ${error.message}`);
  return data;
}

export async function deleteLeadRequestedItem(id: string): Promise<void> {
  const { error } = await supabase
    .from('lead_requested_items')
    .delete()
    .eq('id', id);
  
  if (error) throw new Error(`Failed to delete lead requested item: ${error.message}`);
}

// Scoring Rules
export async function getAllScoringRules(): Promise<ScoringRule[]> {
  const { data, error } = await supabase
    .from('scoring_rules')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch scoring rules: ${error.message}`);
  return data;
}

export async function createScoringRule(rule: Omit<ScoringRule, 'id' | 'created_at' | 'updated_at'>): Promise<ScoringRule> {
  const { data, error } = await supabase
    .from('scoring_rules')
    .insert(rule)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to create scoring rule: ${error.message}`);
  return data;
}

export async function updateScoringRule(id: string, updates: Partial<ScoringRule>): Promise<ScoringRule> {
  const { data, error } = await supabase
    .from('scoring_rules')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to update scoring rule: ${error.message}`);
  return data;
}

export async function deleteScoringRule(id: string): Promise<void> {
  const { error } = await supabase
    .from('scoring_rules')
    .delete()
    .eq('id', id);
  
  if (error) throw new Error(`Failed to delete scoring rule: ${error.message}`);
}

// Lead Scores
export async function getLeadScoresByLeadId(leadId: string): Promise<LeadScore[]> {
  const { data, error } = await supabase
    .from('lead_scores')
    .select('*')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch lead scores: ${error.message}`);
  return data;
}

export async function createLeadScore(score: Omit<LeadScore, 'id' | 'created_at' | 'updated_at'>): Promise<LeadScore> {
  const { data, error } = await supabase
    .from('lead_scores')
    .insert(score)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to create lead score: ${error.message}`);
  return data;
}

// Assignment Rules
export async function getAllAssignmentRules(): Promise<AssignmentRule[]> {
  const { data, error } = await supabase
    .from('assignment_rules')
    .select('*')
    .order('priority', { ascending: true });
  
  if (error) throw new Error(`Failed to fetch assignment rules: ${error.message}`);
  return data;
}

export async function createAssignmentRule(rule: Omit<AssignmentRule, 'id' | 'created_at' | 'updated_at'>): Promise<AssignmentRule> {
  const { data, error } = await supabase
    .from('assignment_rules')
    .insert(rule)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to create assignment rule: ${error.message}`);
  return data;
}

export async function updateAssignmentRule(id: string, updates: Partial<AssignmentRule>): Promise<AssignmentRule> {
  const { data, error } = await supabase
    .from('assignment_rules')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to update assignment rule: ${error.message}`);
  return data;
}

// SMS Notifications
export async function getSmsNotificationsByLeadId(leadId: string): Promise<SmsNotification[]> {
  const { data, error } = await supabase
    .from('sms_notifications')
    .select('*')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch SMS notifications: ${error.message}`);
  return data;
}

export async function createSmsNotification(notification: Omit<SmsNotification, 'id' | 'created_at' | 'updated_at'>): Promise<SmsNotification> {
  const { data, error } = await supabase
    .from('sms_notifications')
    .insert(notification)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to create SMS notification: ${error.message}`);
  return data;
}

export async function updateSmsNotification(id: string, updates: Partial<SmsNotification>): Promise<SmsNotification> {
  const { data, error } = await supabase
    .from('sms_notifications')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to update SMS notification: ${error.message}`);
  return data;
}