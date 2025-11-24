// API utilities for Tax.ai frontend
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { APIResponse, PaginatedResponse } from '@/types'

class APIClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: process.env.API_URL || 'http://localhost:3001/api',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem('auth-token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      (error) => {
        // Handle common errors
        if (error.response?.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem('auth-token')
          window.location.href = '/login'
        }
        
        if (error.response?.status === 429) {
          // Handle rate limiting
          console.error('Rate limit exceeded')
        }

        return Promise.reject(error)
      }
    )
  }

  // Generic request methods
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    const response = await this.client.get(url, config)
    return response.data
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    const response = await this.client.post(url, data, config)
    return response.data
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    const response = await this.client.put(url, data, config)
    return response.data
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    const response = await this.client.patch(url, data, config)
    return response.data
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    const response = await this.client.delete(url, config)
    return response.data
  }

  // Pagination helper
  async getPaginated<T = any>(
    url: string,
    page: number = 1,
    limit: number = 20,
    filters?: Record<string, any>,
    sort?: string
  ): Promise<PaginatedResponse<T>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })

    if (sort) {
      params.append('sort', sort)
    }

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString())
        }
      })
    }

    const response = await this.client.get(`${url}?${params.toString()}`)
    return response.data
  }

  // File upload helper
  async uploadFile(
    url: string,
    file: File,
    onProgress?: (progress: number) => void,
    additionalData?: Record<string, any>
  ): Promise<APIResponse> {
    const formData = new FormData()
    formData.append('file', file)

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value)
      })
    }

    const response = await this.client.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(progress)
        }
      },
    })

    return response.data
  }

  // Set auth token
  setAuthToken(token: string) {
    localStorage.setItem('auth-token', token)
  }

  // Remove auth token
  removeAuthToken() {
    localStorage.removeItem('auth-token')
  }
}

// Create singleton instance
export const apiClient = new APIClient()

// Convenience exports
export const { get, post, put, patch, delete: del } = apiClient

// API endpoint definitions
export const apiEndpoints = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    verifyEmail: '/auth/verify-email',
  },
  users: {
    me: '/users/me',
    profile: '/users/profile',
    update: '/users/update',
    delete: '/users/delete',
  },
  taxForms: {
    list: '/tax-forms',
    create: '/tax-forms',
    get: (id: string) => `/tax-forms/${id}`,
    update: (id: string) => `/tax-forms/${id}`,
    delete: (id: string) => `/tax-forms/${id}`,
    submit: (id: string) => `/tax-forms/${id}/submit`,
    validate: (id: string) => `/tax-forms/${id}/validate`,
    calculate: (id: string) => `/tax-forms/${id}/calculate`,
  },
  documents: {
    list: '/documents',
    upload: '/documents/upload',
    get: (id: string) => `/documents/${id}`,
    download: (id: string) => `/documents/${id}/download`,
    delete: (id: string) => `/documents/${id}`,
    categorize: (id: string) => `/documents/${id}/categorize`,
    extract: (id: string) => `/documents/${id}/extract`,
  },
  compliance: {
    status: '/compliance/status',
    check: '/compliance/check',
    history: '/compliance/history',
    issues: '/compliance/issues',
    resolve: (id: string) => `/compliance/issues/${id}/resolve`,
  },
  ai: {
    chat: '/ai/chat',
    insights: '/ai/insights',
    suggestions: '/ai/suggestions',
    analyze: '/ai/analyze',
    assistant: '/ai/assistant',
  },
  analytics: {
    dashboard: '/analytics/dashboard',
    reports: '/analytics/reports',
    trends: '/analytics/trends',
    export: '/analytics/export',
  },
  notifications: {
    list: '/notifications',
    markAsRead: (id: string) => `/notifications/${id}/read`,
    markAllAsRead: '/notifications/read-all',
    settings: '/notifications/settings',
  },
  teams: {
    list: '/teams',
    create: '/teams',
    get: (id: string) => `/teams/${id}`,
    update: (id: string) => `/teams/${id}`,
    delete: (id: string) => `/teams/${id}`,
    invite: (id: string) => `/teams/${id}/invite`,
    members: (id: string) => `/teams/${id}/members`,
  },
  settings: {
    profile: '/settings/profile',
    preferences: '/settings/preferences',
    security: '/settings/security',
    billing: '/settings/billing',
    integrations: '/settings/integrations',
  },
}

// Error handling utilities
export class APIError extends Error {
  public statusCode: number
  public code: string
  public details?: any

  constructor(message: string, statusCode: number, code: string, details?: any) {
    super(message)
    this.name = 'APIError'
    this.statusCode = statusCode
    this.code = code
    this.details = details
  }
}

export const handleApiError = (error: any): APIError => {
  if (error.response) {
    const { status, data } = error.response
    return new APIError(
      data?.error?.message || 'An error occurred',
      status,
      data?.error?.code || 'UNKNOWN_ERROR',
      data?.error?.details
    )
  } else if (error.request) {
    return new APIError(
      'Network error. Please check your connection.',
      0,
      'NETWORK_ERROR'
    )
  } else {
    return new APIError(
      'An unexpected error occurred.',
      0,
      'UNKNOWN_ERROR'
    )
  }
}

// Request cancellation utilities
export const createCancelToken = () => {
  return axios.CancelToken.source()
}

// Retry logic for failed requests
export const retryRequest = async (
  request: () => Promise<any>,
  retries: number = 3,
  delay: number = 1000
): Promise<any> => {
  try {
    return await request()
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, delay))
      return retryRequest(request, retries - 1, delay * 2)
    }
    throw error
  }
}