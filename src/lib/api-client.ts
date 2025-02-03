const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Add this line to debug the URL
console.log('API Base URL:', API_BASE_URL);

export const apiClient = {
  async getCuratedResources(userId: string) {
    const url = `${API_BASE_URL}/curate-resources/${userId}`;
    console.log('Making request to:', url); // Debug log
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch resources');
    }
    return response.json();
  },

  async createCuratedResources(userId: string, subject: string) {
    const response = await fetch(`${API_BASE_URL}/curate-resources`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, subject }),
    });
    if (!response.ok) {
      throw new Error('Failed to create resources');
    }
    return response.json();
  },

  async getStudyPlan(userId: string) {
    const response = await fetch(`${API_BASE_URL}/generate-plan/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch study plan');
    }
    return response.json();
  },

  async createStudyPlan(userId: string, subject: string, examDate: string) {
    const response = await fetch(`${API_BASE_URL}/generate-plan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, subject, examDate }),
    });
    if (!response.ok) {
      throw new Error('Failed to create study plan');
    }
    return response.json();
  },
}; 