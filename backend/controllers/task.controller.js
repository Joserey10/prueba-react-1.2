const db = require('../models');
const Task = db.Task;

// 1. Obtener todas las tareas
const findAll = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Crear nueva tarea (versión corregida que incluye ambas validaciones)
const create = async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ message: "El título es requerido" });
    }
    
    // Verificar si ya existe una tarea con el mismo título
    const existingTask = await Task.findOne({ 
      where: { title: req.body.title } 
    });
    
    if (existingTask) {
      return res.status(403).json({ 
        message: "Ya existe una tarea con este título" 
      });
    }
    
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 3. Obtener una tarea por ID
const findOne = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Actualizar una tarea
const update = async (req, res) => {
  try {
    const [updated] = await Task.update(req.body, {
      where: { id: req.params.id }
    });
    
    if (updated) {
      const updatedTask = await Task.findByPk(req.params.id);
      return res.status(200).json(updatedTask);
    }
    
    res.status(404).json({ message: "Tarea no encontrada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. Eliminar una tarea (con la validación de estado completado)
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    
    if (task.status === 'completed') {
      return res.status(403).json({ 
        message: "No se puede eliminar una tarea completada" 
      });
    }
    
    const deleted = await Task.destroy({
      where: { id: req.params.id }
    });
    
    if (deleted) {
      return res.status(200).json({ message: "Tarea eliminada" });
    }
    
    res.status(404).json({ message: "Tarea no encontrada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Exportamos todos los métodos
module.exports = {
  findAll,
  create,
  findOne,
  update,
  delete: deleteTask // Usamos alias para 'delete'
};