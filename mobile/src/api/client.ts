import axios from 'axios';
import { API_URL } from '../constants/config';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchUserProgress = async (userId: string) => {
  const response = await apiClient.get(`/api/users/${userId}/progress`);
  return response.data;
};

export const fetchVocabularyStats = async (userId: string) => {
  const response = await apiClient.get(`/api/vocabulary/stats?user_id=${userId}`);
  return response.data;
};

export const fetchLesson = async (lessonId: string) => {
  const response = await apiClient.get(`/api/lessons/${lessonId}`);
  return response.data;
};

export const updateLessonProgress = async (
  lessonId: string,
  userId: string,
  progress: number,
  isCompleted: boolean,
  score?: number
) => {
  const response = await apiClient.post(`/api/lessons/${lessonId}/progress`, {
    user_id: userId,
    progress,
    is_completed: isCompleted,
    score,
  });
  return response.data;
};

export const fetchReviewWords = async (userId: string, limit: number = 20) => {
  const response = await apiClient.get(`/api/vocabulary/review?user_id=${userId}&limit=${limit}`);
  return response.data;
};

export const submitReviewResponse = async (wordId: string, quality: number) => {
  const response = await apiClient.post(`/api/vocabulary/review/${wordId}`, {
    quality,
  });
  return response.data;
};
