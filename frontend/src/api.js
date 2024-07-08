import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const createQuiz = (category, numQues, difficulty, title) => axios.post(`${API_URL}/quiz/create`, null, { params: { category, numQues, difficulty, title } });
export const getAllQuiz = () => axios.get(`${API_URL}/quiz/all`);
export const getQuizQuestions = (id) => axios.get(`${API_URL}/quiz/get/${id}`);
export const submitQuiz = (id, responses) => axios.post(`${API_URL}/quiz/submit/${id}`, responses);
