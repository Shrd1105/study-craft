const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://study-craft-backend.vercel.app' 
    : 'http://localhost:5000');

// Add this line to debug the URL
console.log('API Base URL:', API_BASE_URL);
console.log('Environment:', process.env.NODE_ENV);

export const apiClient = {
  async getCuratedResources(userId: string) {
    const url = `${API_BASE_URL}/curate-resources/${userId}`;
    console.log('Making request to:', url); // Debug log
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Add this for production
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to fetch resources');
      }
      return response.json();
    } catch (error) {
      console.error('Error in getCuratedResources:', error);
      throw error;
    }
  },

  async createCuratedResources(userId: string, subject: string) {
    const url = `${API_BASE_URL}/curate-resources`;
    console.log('Making request to:', url); // Debug log
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Add this for production
        body: JSON.stringify({ userId, subject }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        if (data.error === 'RESOURCE_EXISTS') {
          return data;
        }
        throw {
          status: response.status,
          error: data.error,
          message: data.message,
          response: { data }
        };
      }
      
      return data;
    } catch (error) {
      console.error('Error in createCuratedResources:', error);
      throw error;
    }
  },

  async getStudyPlan(userId: string) {
    const url = `${API_BASE_URL}/generate-plan/${userId}`;
    console.log('Making request to:', url); // Debug log
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Add this for production
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to fetch study plan');
      }
      return response.json();
    } catch (error) {
      console.error('Error in getStudyPlan:', error);
      throw error;
    }
  },

  async createStudyPlan(userId: string, subject: string, examDate: string) {
    const url = `${API_BASE_URL}/generate-plan`;
    console.log('Making request to:', url); // Debug log
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Add this for production
        body: JSON.stringify({ userId, subject, examDate }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        if (data.error === 'PLAN_EXISTS') {
          return data;
        }
        throw {
          status: response.status,
          error: data.error,
          message: data.message,
          response: { data }
        };
      }
      
      return data;
    } catch (error) {
      console.error('Error in createStudyPlan:', error);
      throw error;
    }
  },

  async deleteStudyPlan(planId: string) {
    const url = `${API_BASE_URL}/generate-plan/${planId}`;
    console.log('Making request to:', url); // Debug log
    
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Add this for production
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw {
          status: response.status,
          error: data.error,
          message: data.message || 'Failed to delete plan',
          response: { data }
        };
      }
      
      return data;
    } catch (error) {
      console.error('Error in deleteStudyPlan:', error);
      throw error;
    }
  },

  async deleteCuratedResources(resourceId: string) {
    const url = `${API_BASE_URL}/curate-resources/${resourceId}`;
    console.log('Making request to:', url); // Debug log
    
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Add this for production
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to delete resources');
      }
      return response.json();
    } catch (error) {
      console.error('Error in deleteCuratedResources:', error);
      throw error;
    }
  }
}; 