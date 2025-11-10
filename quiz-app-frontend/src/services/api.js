// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

// Create axios instance with better configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} Response from: ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      message: error.message,
      status: error.response?.status,
      url: error.config?.url,
      data: error.response?.data
    });
    
    // Enhanced error messages
    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case 404:
          error.userMessage = 'Requested resource not found';
          break;
        case 500:
          error.userMessage = 'Server error. Please try again later.';
          break;
        case 401:
          error.userMessage = 'Unauthorized access';
          break;
        default:
          error.userMessage = 'Something went wrong. Please try again.';
      }
    } else if (error.request) {
      // Request made but no response received
      error.userMessage = 'Network error. Please check your connection.';
    } else {
      // Something else happened
      error.userMessage = 'An unexpected error occurred.';
    }
    
    return Promise.reject(error);
  }
);

export const questionService = {
  // Get all questions
  getAllQuestions: () => api.get('/question/allQuestions'),
  
  // Get questions by category
  getQuestionsByCategory: (category) => 
    api.get(`/question/category/${encodeURIComponent(category)}`),
  
  // Add new question
  addQuestion: (questionData) => {
    const question = {
      questionTitle: questionData.questionTitle,
      option1: questionData.option1,
      option2: questionData.option2,
      option3: questionData.option3,
      option4: questionData.option4,
      rightAnswer: questionData.rightAnswer,
      difficultylevel: questionData.difficultylevel,
      category: questionData.category
    };
    return api.post('/question/add', question);
  },
  
  // Update existing question
  updateQuestion: (questionData) => {
    const question = {
      id: questionData.id,
      questionTitle: questionData.questionTitle,
      option1: questionData.option1,
      option2: questionData.option2,
      option3: questionData.option3,
      option4: questionData.option4,
      rightAnswer: questionData.rightAnswer,
      difficultylevel: questionData.difficultylevel,
      category: questionData.category
    };
    return api.put('/question/update', question);
  },
  
  // Delete question
  deleteQuestion: (id) => api.delete(`/question/delete/${id}`),
  
  // Get available categories
  getCategories: async () => {
    try {
      const response = await api.get('/question/allQuestions');
      const questions = response.data;
      const categories = [...new Set(questions.map(q => q.category))];
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Return default categories if API fails
      return ['Java', 'Python', 'JavaScript', 'SQL', 'Spring Boot'];
    }
  }
};

export const quizService = {
  // Create new quiz
  createQuiz: (category, title) => 
    api.post(`/quiz/create?category=${encodeURIComponent(category)}&title=${encodeURIComponent(title)}`),
  
  // Get quiz questions
  getQuiz: (id) => api.get(`/quiz/get/${id}`),
  
  // Submit quiz answers
  submitQuiz: (id, responses) => 
    api.post(`/quiz/submit/${id}`, responses),
  
  // Delete quiz (if needed)
  deleteQuiz: (id) => api.delete(`/quiz/delete/${id}`),
};

// Utility functions
export const apiUtils = {
  // Check if backend is reachable
  healthCheck: () => api.get('/actuator/health').catch(() => ({ data: { status: 'DOWN' } })),
  
  // Handle API errors in components
  handleApiError: (error, setError) => {
    const userMessage = error.userMessage || error.message || 'An error occurred';
    if (setError) {
      setError(userMessage);
    }
    return userMessage;
  },
  
  // Extract categories from questions
  extractCategories: (questions) => {
    return [...new Set(questions.map(q => q.category))];
  }
};

export default api;