import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
};

// Auth API
export const authAPI = {
  signup: async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    const response = await axios.post(`${API_URL}/auth/signup`, data);
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    return response.data;
  },

  getProfile: async (token: string) => {
    try {
      console.log('Making profile request to:', `${API_URL}/auth/profile`);
      const response = await axios.get(`${API_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Profile response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Profile request error:', error.response?.data || error.message);
      if (error.response) {
        throw error;
      } else if (error.request) {
        throw new Error('No response from server');
      } else {
        throw new Error('Error setting up request');
      }
    }
  },
};

// User API
export const userAPI = {
  updateProfile: async (token: string, data: {
    name: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    upiId: string;
    phoneNumber: string;
  }) => {
    try {
      console.log('Making update profile request to:', `${API_URL}/user/profile`);
      console.log('Update data:', data);
      const response = await axios.put(
        `${API_URL}/user/profile`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Update response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Update profile error:', error.response?.data || error.message);
      throw error;
    }
  },

  updatePassword: async (token: string, data: { currentPassword: string; newPassword: string }) => {
    const response = await axios.put(
      `${API_URL}/user/password`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  getBalance: async (token: string) => {
    const response = await axios.get(`${API_URL}/user/balance`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};

// Dashboard API
export const dashboardAPI = {
  getDashboardData: async (token: string) => {
    const response = await fetch(`${API_URL}/dashboard`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  getReferralHistory: async (token: string) => {
    const response = await fetch(`${API_URL}/dashboard/referrals`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },
}; 