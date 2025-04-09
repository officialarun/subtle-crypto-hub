import axios from 'axios';
import { API_BASE_URL } from './config';

export const depositAPI = {
  // User endpoints
  submitDeposit: async (data: {
    amount: number;
    utrNumber: string;
    upiId: string;
    paymentDate: string;
  }) => {
    try {
      console.log('Submitting deposit with data:', data);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      const response = await axios.post(
        `${API_BASE_URL}/deposits`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Deposit submission response:', response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Deposit submission error details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          headers: error.response?.headers,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            headers: error.config?.headers,
            data: error.config?.data
          }
        });
      } else {
        console.error('Non-Axios error:', error);
      }
      throw error;
    }
  },

  // Admin endpoints
  getAllDeposits: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/deposits`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Get deposits error details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data
        });
      }
      throw error;
    }
  },

  getDepositStats: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/deposits/stats`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Get stats error details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data
        });
      }
      throw error;
    }
  },

  updateDepositStatus: async (depositId: string, status: 'approved' | 'rejected') => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/admin/deposits/${depositId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Update status error details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data
        });
      }
      throw error;
    }
  }
}; 