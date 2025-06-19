'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      // Relaciones pueden ir aquí
    }
  }
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El título es requerido'
        },
        len: {
          args: [3, 100],
          msg: 'El título debe tener entre 3 y 100 caracteres'
        },
        async isUnique(value) {
          const task = await Task.findOne({ where: { title: value } });
          if (task && task.id !== this.id) {
            throw new Error('Ya existe una tarea con este título');
          }
        }
      }
    },  // <-- Esta llave cierra la definición de title
    description: {
      type: DataTypes.TEXT,
      validate: {
        len: {
          args: [0, 500],
          msg: 'La descripción no puede exceder los 500 caracteres'
        }
      }
    },
    status: {
      type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
      defaultValue: 'pending',
      validate: {
        isIn: {
          args: [['pending', 'in_progress', 'completed']],
          msg: "Estado no válido"
        }
      }
    },
    dueDate: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          msg: 'Debe ser una fecha válida'
        },
        isAfter: {
          args: new Date().toISOString(),
          msg: 'La fecha debe ser futura'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Task',
    timestamps: true,
    paranoid: true // Borrado lógico
  });
  return Task;
};