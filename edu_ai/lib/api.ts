const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export class ApiService {
  private static async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      
      // Check if it's a network error
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Cannot connect to backend. Make sure the backend server is running on http://localhost:8000');
      }
      
      throw error;
    }
  }

  // Health check endpoint
  static async healthCheck() {
    try {
      return await this.request('/health');
    } catch (error) {
      throw new Error('Backend server is not responding. Please start the backend server.');
    }
  }

  // Tutor Chat
  static async tutorChat(question: string, token?: string) {
    return this.request('/tutor/chat', {
      method: 'POST',
      body: JSON.stringify({ question }),
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  // Generate Quiz
  static async generateQuiz(topic: string, difficulty: string = 'intermediate', token?: string) {
    return this.request('/tutor/quiz', {
      method: 'POST',
      body: JSON.stringify({ topic, difficulty }),
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  // Generate Summary
  static async generateSummary(topic: string, level: string = 'intermediate', token?: string) {
    return this.request('/tutor/summary', {
      method: 'POST',
      body: JSON.stringify({ topic, level }),
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  // Generate Examples
  static async generateExamples(topic: string, level: string = 'intermediate', token?: string) {
    return this.request('/tutor/examples', {
      method: 'POST',
      body: JSON.stringify({ topic, level }),
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  // Notes Generation
  static async generateNotes(fileId: string, token?: string) {
    return this.request('/notes/generate', {
      method: 'POST',
      body: JSON.stringify({ fileId }),
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  // Books
  static async getBooks(token?: string) {
    return this.request('/books/', {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  // Exam Predictor
  static async predictExam(data: any, token?: string) {
    return this.request('/exam/predict', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  // Focus Mode
  static async getFocusSession(token?: string) {
    return this.request('/focus/session', {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  // Sources
  static async getSources(token?: string) {
    return this.request('/sources/', {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }
}
