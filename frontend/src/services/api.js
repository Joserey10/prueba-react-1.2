import axios from 'axios';

const API_URL = '/api/tasks';

// Crear nueva tarea
export const createTask = async (taskData) => {
  try {
    const response = await axios.post(API_URL, taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error.response?.data?.message || error.message);
    throw error;
  }
};

// Obtener todas las tareas
export const getTasks = async (filters = {}) => {
  try {
    const response = await axios.get(API_URL, { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error.response?.data?.message || error.message);
    throw error;
  }
};

// Obtener una tarea por ID
export const getTask = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching task:', error.response?.data?.message || error.message);
    throw error;
  }
};

// Actualizar tarea
export const updateTask = async (id, taskData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, taskData);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error.response?.data?.message || error.message);
    throw error;
  }
};

// Eliminar tarea
export const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error.response?.data?.message || error.message);
    throw error;
  }
};

// Obtener tareas completadas
export const getCompletedTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/completed`);
    return response.data;
  } catch (error) {
    console.error('Error fetching completed tasks:', error.response?.data?.message || error.message);
    throw error;
  }
};

// Exportación nombrada alternativa
const api = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  getCompletedTasks
};

export default api;