import axios from 'axios';

const API = axios.create({
  baseURL: "http://localhost:5000/api/users",
});

export const getUsers = (params) => API.get("/", { params });
export const getUser = (id) => API.get(`/${id}`);
export const createUser = (data) => API.post("/", data);
export const updateUser = (id, data) => API.put(`/${id}`, data);
export const deleteUser = (id) => API.delete(`/${id}`);
export const exportCSV = () =>
  window.open("http://localhost:5000/api/users/export/csv");