require('dotenv').config(); // Carga variables desde .env
const express = require('express');
const cors = require('cors');

// Importa el modelo Task
const { Task } = require('./models');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas CRUD

// Obtener todas las tareas
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
});

// Crear una tarea
app.post('/tasks', async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.create({ title, description, status });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear tarea' });
  }
});

// Actualizar una tarea
app.put('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });

    const { title, description, status } = req.body;
    await task.update({ title, description, status });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar tarea' });
  }
});

// Eliminar una tarea
app.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });

    await task.destroy();
    res.json({ message: 'Tarea eliminada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar tarea' });
  }
});

// Arrancar el servidor
const PORT = process.env.PORT || 3306;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
