import axios from 'axios';

const baseURL = process.env.NODE_ENV === "development" ? "http://localhost:5000/" : "/"

const API = axios.create({
      baseURL
});

API.interceptors.request.use((req) => {
      if (localStorage.getItem('profile')) {
            req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
      }
      return req;
})

export const fetchCards = () => API.get('cards');

export const createCard = (newCard) => API.post('cards', newCard);

export const updateCard = (id, updatedCard) => API.patch(`cards/${id}`, updatedCard);

export const deleteCard = (id) => API.delete(`cards/delete/${id}`);

export const login = (formData) => API.post(`user/login`, formData);

export const signup = (formData) => API.post(`user/signup`, formData);

export const aggregateSubjects = () => API.get('cards/aggregate');

export const getCardForTopic = (topic) => API.get(`cards/getTopics/${topic}`)



