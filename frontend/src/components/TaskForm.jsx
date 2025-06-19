import React, { useState, useEffect } from 'react'; 
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem 
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getTask, createTask, updateTask } from '../services/api';

const TaskForm = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'pending'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        try {
          const taskData = await getTask(id);
          setTask(taskData);
        } catch (error) {
          setError('Error al cargar la tarea');
        }
      };
      fetchTask();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (id) {
        await updateTask(id, task);
      } else {
        await createTask(task);
      }
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Error al guardar la tarea');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        {id ? 'Editar Tarea' : 'Crear Nueva Tarea'}
      </Typography>
      
      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}

      <TextField
        fullWidth
        margin="normal"
        label="Título"
        name="title"
        value={task.title}
        onChange={handleChange}
        required
      />

      <TextField
        fullWidth
        margin="normal"
        label="Descripción"
        name="description"
        multiline
        rows={4}
        value={task.description}
        onChange={handleChange}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Estado</InputLabel>
        <Select
          name="status"
          value={task.status}
          label="Estado"
          onChange={handleChange}
        >
          <MenuItem value="pending">Pendiente</MenuItem>
          <MenuItem value="in_progress">En Proceso</MenuItem>
          <MenuItem value="completed">Completado</MenuItem>
        </Select>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? 'Guardando...' : id ? 'Actualizar' : 'Guardar'}
      </Button>
    </Box>
  );
};

export default TaskForm;

