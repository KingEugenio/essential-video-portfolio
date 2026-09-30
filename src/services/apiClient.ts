/**
 * Cinefolio API Client
 * Centralized client for server-side endpoints with token persistence,
 * automatic fallback handling, and typed responses.
 */

const API_BASE = '/api';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  [key: string]: any;
}

class ApiClient {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('cinefolio_auth_token');
  }

  public setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('cinefolio_auth_token', token);
    } else {
      localStorage.removeItem('cinefolio_auth_token');
    }
  }

  public getToken(): string | null {
    return this.token || localStorage.getItem('cinefolio_auth_token');
  }

  private getHeaders(): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const legacyPasscode = localStorage.getItem('cinefolio_admin_pin') || 'cinefolio2026';
    if (legacyPasscode) {
      headers['x-admin-passcode'] = legacyPasscode;
    }
    return headers;
  }

  public async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...(options.headers || {}),
        },
      });

      if (response.status === 401) {
        // Handle token expiry if needed
      }

      const data = await response.json();
      return data;
    } catch (err: any) {
      console.warn(`[API] Error calling ${endpoint}:`, err);
      return {
        success: false,
        message: err.message || 'Network request failed',
      };
    }
  }

  // Auth endpoints
  public async login(email?: string, password?: string, passcode?: string) {
    const res = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, passcode }),
    });
    if (res.success && res.token) {
      this.setToken(res.token);
    }
    return res;
  }

  public async getMe() {
    return this.request('/auth/me');
  }

  public async logout() {
    await this.request('/auth/logout', { method: 'POST' });
    this.setToken(null);
  }

  // Portfolio & Brand
  public async getPortfolio() {
    return this.request('/portfolio/current');
  }

  public async updateBranding(brand: any) {
    return this.request('/portfolio/branding', {
      method: 'PUT',
      body: JSON.stringify({ brand }),
    });
  }

  public async updateTheme(theme: any) {
    return this.request('/portfolio/theme', {
      method: 'PUT',
      body: JSON.stringify({ theme }),
    });
  }

  // Projects
  public async getProjects(publishedOnly: boolean = false) {
    return this.request(`/projects?publishedOnly=${publishedOnly}`);
  }

  public async getProject(slug: string) {
    return this.request(`/projects/${slug}`);
  }

  public async createProject(project: any) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    });
  }

  public async updateProject(id: string, project: any) {
    return this.request(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
    });
  }

  public async deleteProject(id: string) {
    return this.request(`/projects/${id}`, { method: 'DELETE' });
  }

  public async reorderProjects(orderedProjects: any[]) {
    return this.request('/projects/reorder', {
      method: 'POST',
      body: JSON.stringify({ orderedProjects }),
    });
  }

  // Media
  public async getMedia() {
    return this.request('/media');
  }

  public async createMedia(mediaItem: any) {
    return this.request('/media', {
      method: 'POST',
      body: JSON.stringify(mediaItem),
    });
  }

  public async deleteMedia(id: string) {
    return this.request(`/media/${id}`, { method: 'DELETE' });
  }

  // Invoices & Payments
  public async getInvoices() {
    return this.request('/invoices');
  }

  public async createInvoice(invoice: any) {
    return this.request('/invoices', {
      method: 'POST',
      body: JSON.stringify(invoice),
    });
  }

  public async updateInvoice(id: string, invoice: any) {
    return this.request(`/invoices/${id}`, {
      method: 'PUT',
      body: JSON.stringify(invoice),
    });
  }

  public async deleteInvoice(id: string) {
    return this.request(`/invoices/${id}`, { method: 'DELETE' });
  }

  public async createCheckoutSession(invoiceId: string) {
    return this.request(`/invoices/${invoiceId}/checkout-session`, { method: 'POST' });
  }

  // Contracts
  public async getContracts() {
    return this.request('/contracts');
  }

  public async createContract(contract: any) {
    return this.request('/contracts', {
      method: 'POST',
      body: JSON.stringify(contract),
    });
  }

  public async updateContract(id: string, contract: any) {
    return this.request(`/contracts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(contract),
    });
  }

  // Proofing & Reviews
  public async getProofingReviews() {
    return this.request('/proofing');
  }

  public async getProofingReview(id: string) {
    return this.request(`/proofing/${id}`);
  }

  public async createProofingReview(review: any) {
    return this.request('/proofing', {
      method: 'POST',
      body: JSON.stringify(review),
    });
  }

  public async addProofingComment(reviewId: string, comment: any) {
    return this.request(`/proofing/${reviewId}/comments`, {
      method: 'POST',
      body: JSON.stringify(comment),
    });
  }

  public async resolveProofingComment(reviewId: string, commentId: string) {
    return this.request(`/proofing/${reviewId}/comments/${commentId}/resolve`, {
      method: 'PUT',
    });
  }

  // Notifications
  public async getNotifications() {
    return this.request('/notifications');
  }

  public async markNotificationRead(id: string) {
    return this.request(`/notifications/${id}/read`, { method: 'PUT' });
  }

  public async markAllNotificationsRead() {
    return this.request('/notifications/mark-all-read', { method: 'POST' });
  }

  // AI Workflow
  public async generateProjectDescription(params: any) {
    return this.request('/ai/generate-description', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  public async generateSEO(params: any) {
    return this.request('/ai/generate-seo', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  public async summarizeBrief(params: any) {
    return this.request('/ai/summarize-brief', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  // Analytics
  public async trackEvent(eventData: any) {
    return this.request('/analytics/event', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  public async getAnalyticsDashboard() {
    return this.request('/analytics/dashboard');
  }

  // Integrations Hub
  public async getIntegrations() {
    return this.request('/integrations');
  }

  public async toggleIntegration(id: string, isConnected: boolean, accountEmail?: string) {
    return this.request(`/integrations/${id}/toggle`, {
      method: 'POST',
      body: JSON.stringify({ isConnected, accountEmail }),
    });
  }

  // Migration & Portability
  public async syncLocalStorageToCloud(payload: any) {
    return this.request('/migration/sync-local', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  public async getAuditLogs() {
    return this.request('/audit');
  }
}

export const apiClient = new ApiClient();
