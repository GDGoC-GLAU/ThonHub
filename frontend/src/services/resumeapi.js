/**
 * Resume API Service
 * Author: Akshit
 */

import apiService from './api';

const resumeApi = {
  uploadResume: async (file, onProgress) => {
    const formData = new FormData();
    formData.append('file', file);
    return await apiService.uploadFile('/resume/upload', formData, onProgress);
  },
  
  analyzeResume: async (text) => {
    return await apiService.post('/resume/analyze', { text });
  },
};

export default resumeApi;
