const express = require('express');
const router = express.Router(); // Esta línea es crucial
const taskController = require('../controllers/task.controller');

// Configuración de rutas
router.get('/', taskController.findAll);
router.post('/', taskController.create);
router.get('/:id', taskController.findOne);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.delete);

module.exports = router;