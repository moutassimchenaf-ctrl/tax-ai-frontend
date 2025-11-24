// Global TypeScript types for Tax.ai

export interface User {
  id: string
  email: string
  full_name: string
  role: 'admin' | 'user' | 'accountant' | 'tax_professional'
  company?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface TaxForm {
  id: string
  user_id: string
  form_type: string
  tax_year: number
  status: 'draft' | 'in_progress' | 'review' | 'submitted' | 'accepted' | 'rejected'
  data: Record<string, any>
  calculations: Record<string, number>
  created_at: string
  updated_at: string
  submitted_at?: string
}

export interface Document {
  id: string
  user_id: string
  filename: string
  original_name: string
  mime_type: string
  size: number
  category: 'tax_form' | 'receipt' | 'invoice' | 'bank_statement' | 'other'
  tags: string[]
  uploaded_at: string
  processed_at?: string
  extracted_data?: Record<string, any>
}

export interface ComplianceCheck {
  id: string
  user_id: string
  type: 'vat' | 'corporate_tax' | 'withholding_tax' | 'zakat'
  status: 'pending' | 'passed' | 'failed' | 'warning'
  score: number
  issues: ComplianceIssue[]
  checked_at: string
  next_check?: string
}

export interface ComplianceIssue {
  id: string
  type: 'error' | 'warning' | 'info'
  message: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  category: string
  suggested_action?: string
  resolved: boolean
  resolved_at?: string
}

export interface AIInsight {
  id: string
  user_id: string
  type: 'compliance' | 'optimization' | 'risk' | 'opportunity'
  title: string
  description: string
  confidence: number
  impact: 'low' | 'medium' | 'high'
  actions: AIAction[]
  created_at: string
  dismissed: boolean
  dismissed_at?: string
}

export interface AIAction {
  id: string
  type: 'review' | 'update' | 'submit' | 'consult'
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  completed: boolean
  completed_at?: string
}

export interface Notification {
  id: string
  user_id: string
  type: 'info' | 'warning' | 'error' | 'success'
  title: string
  message: string
  action_url?: string
  read: boolean
  created_at: string
  read_at?: string
}

export interface TeamMember {
  id: string
  user_id: string
  team_id: string
  role: 'owner' | 'admin' | 'member' | 'viewer'
  permissions: string[]
  joined_at: string
}

export interface Team {
  id: string
  name: string
  owner_id: string
  members: TeamMember[]
  settings: Record<string, any>
  created_at: string
  updated_at: string
}

export interface AnalyticsData {
  period: string
  total_forms: number
  compliance_rate: number
  average_processing_time: number
  cost_savings: number
  risk_score: number
  top_issues: ComplianceIssue[]
  trends: {
    date: string
    forms_processed: number
    compliance_rate: number
    processing_time: number
  }[]
}

export interface ChatMessage {
  id: string
  user_id: string
  session_id: string
  message: string
  response?: string
  context?: Record<string, any>
  created_at: string
}

export interface TaxRule {
  id: string
  jurisdiction: string
  rule_type: 'vat' | 'corporate_tax' | 'withholding_tax' | 'zakat'
  effective_date: string
  expiry_date?: string
  conditions: Record<string, any>
  calculations: Record<string, any>
  metadata: Record<string, any>
  version: number
  active: boolean
}

export interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: any
  }
  meta?: {
    timestamp: string
    version: string
    request_id: string
  }
}

export interface PaginatedResponse<T = any> extends APIResponse<T[]> {
  meta: {
    timestamp: string
    version: string
    request_id: string
    pagination: {
      page: number
      limit: number
      total: number
      pages: number
      has_next: boolean
      has_prev: boolean
    }
  }
}

// Form validation types
export interface ValidationRule {
  field: string
  type: 'required' | 'format' | 'range' | 'custom'
  message: string
  params?: Record<string, any>
}

export interface ValidationError {
  field: string
  message: string
  type: string
}

// File upload types
export interface UploadProgress {
  loaded: number
  total: number
  percentage: number
}

export interface FileUploadOptions {
  maxSize?: number
  allowedTypes?: string[]
  onProgress?: (progress: UploadProgress) => void
  onSuccess?: (response: any) => void
  onError?: (error: any) => void
}

// WebSocket types
export interface SocketEvent {
  type: string
  payload: any
  timestamp: string
  user_id?: string
}

export interface CollaborationEvent extends SocketEvent {
  document_id: string
  action: 'edit' | 'view' | 'comment' | 'cursor'
  data: any
}

// Theme types
export type Theme = 'light' | 'dark' | 'system'

export interface ThemeConfig {
  primary: string
  secondary: string
  background: string
  surface: string
  text: string
  textSecondary: string
}

// Utility types
export type Status = 'idle' | 'loading' | 'success' | 'error'

export type SortOrder = 'asc' | 'desc'

export interface SortConfig {
  field: string
  order: SortOrder
}

export interface FilterConfig {
  field: string
  operator: 'eq' | 'ne' | 'gt' | 'lt' | 'gte' | 'lte' | 'in' | 'nin' | 'like'
  value: any
}

export interface SearchConfig {
  query: string
  fields: string[]
  fuzzy?: boolean
}