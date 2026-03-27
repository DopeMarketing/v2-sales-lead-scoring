BEGIN;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('Sales Rep', 'Sales Manager', 'Admin')),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  availability_status TEXT NOT NULL CHECK (availability_status IN ('available', 'busy', 'offline')),
  max_lead_capacity INTEGER NOT NULL,
  current_lead_count INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX users_email_idx ON users (email);
CREATE INDEX users_role_idx ON users (role);
CREATE INDEX users_created_at_idx ON users (created_at);

-- Leads table
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  assigned_rep_id UUID REFERENCES users(id) ON DELETE SET NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company_name TEXT,
  company_size TEXT CHECK (company_size IN ('Small', 'Medium', 'Large', 'Enterprise')),
  industry TEXT,
  email_domain TEXT,
  status TEXT NOT NULL CHECK (status IN ('new', 'contacted', 'qualified', 'unqualified', 'converted', 'lost')),
  source TEXT,
  hubspot_id TEXT,
  salesforce_id TEXT,
  total_score INTEGER NOT NULL DEFAULT 0,
  score_tier TEXT CHECK (score_tier IN ('Low', 'Medium', 'High', 'Hot')),
  qualification_notes TEXT,
  chatbot_conversation_id UUID,
  last_contacted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX leads_user_id_idx ON leads (user_id);
CREATE INDEX leads_assigned_rep_id_idx ON leads (assigned_rep_id);
CREATE INDEX leads_email_idx ON leads (email);
CREATE INDEX leads_status_idx ON leads (status);
CREATE INDEX leads_score_tier_idx ON leads (score_tier);
CREATE UNIQUE INDEX leads_hubspot_id_idx ON leads (hubspot_id) WHERE hubspot_id IS NOT NULL;
CREATE INDEX leads_created_at_idx ON leads (created_at);

-- Lead tags table
CREATE TABLE lead_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  tag_name TEXT NOT NULL,
  tag_type TEXT NOT NULL CHECK (tag_type IN ('auto', 'manual')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX lead_tags_user_id_idx ON lead_tags (user_id);
CREATE INDEX lead_tags_lead_id_idx ON lead_tags (lead_id);
CREATE INDEX lead_tags_tag_name_idx ON lead_tags (tag_name);
CREATE INDEX lead_tags_created_at_idx ON lead_tags (created_at);

-- Lead requested items table
CREATE TABLE lead_requested_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL,
  item_category TEXT,
  estimated_value INTEGER,
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX lead_requested_items_user_id_idx ON lead_requested_items (user_id);
CREATE INDEX lead_requested_items_lead_id_idx ON lead_requested_items (lead_id);
CREATE INDEX lead_requested_items_item_category_idx ON lead_requested_items (item_category);
CREATE INDEX lead_requested_items_created_at_idx ON lead_requested_items (created_at);

-- Scoring rules table
CREATE TABLE scoring_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rule_type TEXT NOT NULL CHECK (rule_type IN ('email_domain', 'phone_pattern', 'company_size', 'requested_item', 'industry')),
  rule_name TEXT NOT NULL,
  criteria JSONB NOT NULL,
  score_value INTEGER NOT NULL,
  weight INTEGER NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX scoring_rules_user_id_idx ON scoring_rules (user_id);
CREATE INDEX scoring_rules_rule_type_idx ON scoring_rules (rule_type);
CREATE INDEX scoring_rules_is_active_idx ON scoring_rules (is_active);
CREATE INDEX scoring_rules_created_at_idx ON scoring_rules (created_at);

-- Lead scores table
CREATE TABLE lead_scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  scoring_rule_id UUID NOT NULL REFERENCES scoring_rules(id) ON DELETE CASCADE,
  score_value INTEGER NOT NULL,
  calculated_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX lead_scores_user_id_idx ON lead_scores (user_id);
CREATE INDEX lead_scores_lead_id_idx ON lead_scores (lead_id);
CREATE INDEX lead_scores_scoring_rule_id_idx ON lead_scores (scoring_rule_id);
CREATE INDEX lead_scores_created_at_idx ON lead_scores (created_at);

-- Assignment rules table
CREATE TABLE assignment_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rule_name TEXT NOT NULL,
  score_threshold_min INTEGER NOT NULL,
  score_threshold_max INTEGER,
  assignment_strategy TEXT NOT NULL CHECK (assignment_strategy IN ('round_robin', 'lowest_load', 'random', 'skill_based')),
  eligible_rep_ids UUID[],
  priority INTEGER NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX assignment_rules_user_id_idx ON assignment_rules (user_id);
CREATE INDEX assignment_rules_score_threshold_min_idx ON assignment_rules (score_threshold_min);
CREATE INDEX assignment_rules_priority_idx ON assignment_rules (priority);
CREATE INDEX assignment_rules_is_active_idx ON assignment_rules (is_active);
CREATE INDEX assignment_rules_created_at_idx ON assignment_rules (created_at);

-- SMS notifications table
CREATE TABLE sms_notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  recipient_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  phone_number TEXT NOT NULL,
  message_body TEXT NOT NULL,
  twilio_sid TEXT,
  status TEXT NOT NULL CHECK (status IN ('pending', 'sent', 'delivered', 'failed')),
  error_message TEXT,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX sms_notifications_user_id_idx ON sms_notifications (user_id);
CREATE INDEX sms_notifications_lead_id_idx ON sms_notifications (lead_id);
CREATE INDEX sms_notifications_recipient_user_id_idx ON sms_notifications (recipient_user_id);
CREATE INDEX sms_notifications_status_idx ON sms_notifications (status);
CREATE UNIQUE INDEX sms_notifications_twilio_sid_idx ON sms_notifications (twilio_sid) WHERE twilio_sid IS NOT NULL;
CREATE INDEX sms_notifications_created_at_idx ON sms_notifications (created_at);

-- Add foreign key constraint for chatbot_conversation_id after creating chatbot_conversations
-- This will be added later in the migration

-- Chatbot conversations table
CREATE TABLE chatbot_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  session_id TEXT NOT NULL,
  ai_provider TEXT NOT NULL CHECK (ai_provider IN ('chatgpt', 'claude')),
  conversation_data JSONB NOT NULL,
  qualification_score INTEGER,
  qualification_summary TEXT,
  status TEXT NOT NULL CHECK (status IN ('active', 'completed', 'abandoned')),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX chatbot_conversations_user_id_idx ON chatbot_conversations (user_id);
CREATE UNIQUE INDEX chatbot_conversations_session_id_idx ON chatbot_conversations (session_id);
CREATE INDEX chatbot_conversations_lead_id_idx ON chatbot_conversations (lead_id);
CREATE INDEX chatbot_conversations_status_idx ON chatbot_conversations (status);
CREATE INDEX chatbot_conversations_created_at_idx ON chatbot_conversations (created_at);

-- Add foreign key constraint for chatbot_conversation_id
ALTER TABLE leads ADD CONSTRAINT leads_chatbot_conversation_id_fkey FOREIGN KEY (chatbot_conversation_id) REFERENCES chatbot_conversations(id) ON DELETE SET NULL;

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_requested_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE scoring_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignment_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE sms_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_conversations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "owner_all" ON users FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON leads FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON lead_tags FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON lead_requested_items FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON scoring_rules FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON lead_scores FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON assignment_rules FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON sms_notifications FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON chatbot_conversations FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

COMMIT;