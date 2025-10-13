/**
 * Axios API Service for ML Simulator
 * Author: Akshit
 * Date: October 13, 2025
 * Purpose: Centralized API service for secure backend communication
 */

import axios from 'axios';

// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
const API_TIMEOUT = 30000; // 30 seconds

/**
 * Create Axios instance with default configuration
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

/**
 * Request Interceptor
 * Add authentication token and modify request before sending
 */
apiClient.interceptors.request.use(
  (config) => {
    // Add authentication token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add timestamp to prevent caching
    config.headers['X-Request-Time'] = new Date().getTime();

    // Log request in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
      });
    }

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handle responses and errors globally
 */
apiClient.interceptors.response.use(
  (response) => {
    // Log response in development
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }

    return response.data;
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 400:
          console.error('❌ Bad Request:', data.message || 'Invalid request');
          break;
        case 401:
          console.error('❌ Unauthorized: Please login again');
          // Clear token and redirect to login
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
          break;
        case 403:
          console.error('❌ Forbidden: You do not have permission');
          break;
        case 404:
          console.error('❌ Not Found:', data.message || 'Resource not found');
          break;
        case 500:
          console.error('❌ Server Error:', data.message || 'Internal server error');
          break;
        case 503:
          console.error('❌ Service Unavailable: Server is down');
          break;
        default:
          console.error('❌ Error:', data.message || 'An error occurred');
      }

      return Promise.reject({
        status,
        message: data.message || 'An error occurred',
        data: data,
      });
    } else if (error.request) {
      // Request made but no response received
      console.error('❌ Network Error: No response from server');
      return Promise.reject({
        status: 0,
        message: 'Network error. Please check your connection.',
        data: null,
      });
    } else {
      // Something else happened
      console.error('❌ Error:', error.message);
      return Promise.reject({
        status: 0,
        message: error.message || 'An unexpected error occurred',
        data: null,
      });
    }
  }
);

/**
 * API Service Methods
 */
const apiService = {
  /**
   * GET request
   * @param {string} endpoint - API endpoint
   * @param {object} params - Query parameters
   * @returns {Promise} Response data
   */
  get: async (endpoint, params = {}) => {
    try {
      const response = await apiClient.get(endpoint, { params });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error };
    }
  },

  /**
   * POST request
   * @param {string} endpoint - API endpoint
   * @param {object} data - Request body
   * @returns {Promise} Response data
   */
  post: async (endpoint, data = {}) => {
    try {
      const response = await apiClient.post(endpoint, data);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error };
    }
  },

  /**
   * PUT request
   * @param {string} endpoint - API endpoint
   * @param {object} data - Request body
   * @returns {Promise} Response data
   */
  put: async (endpoint, data = {}) => {
    try {
      const response = await apiClient.put(endpoint, data);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error };
    }
  },

  /**
   * PATCH request
   * @param {string} endpoint - API endpoint
   * @param {object} data - Request body
   * @returns {Promise} Response data
   */
  patch: async (endpoint, data = {}) => {
    try {
      const response = await apiClient.patch(endpoint, data);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error };
    }
  },

  /**
   * DELETE request
   * @param {string} endpoint - API endpoint
   * @returns {Promise} Response data
   */
  delete: async (endpoint) => {
    try {
      const response = await apiClient.delete(endpoint);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error };
    }
  },

  /**
   * Upload file with multipart/form-data
   * @param {string} endpoint - API endpoint
   * @param {FormData} formData - Form data with file
   * @param {function} onProgress - Progress callback
   * @returns {Promise} Response data
   */
  uploadFile: async (endpoint, formData, onProgress = null) => {
    try {
      const response = await apiClient.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(percentCompleted);
          }
        },
      });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error };
    }
  },
};

export default apiService;
