const express = require('express');
const app = express();
const taskRoutes = require('./routes/task.routes');

// Middlewares esenciales
app.use(express.json());

// Configuración de rutas
app.use('/api/tasks', taskRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});