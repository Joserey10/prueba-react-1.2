import React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Tooltip
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const getStatusColor = (status) => {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'in_progress':
      return 'info';
    case 'completed':
      return 'success';
    default:
      return 'default';
  }
};

const TaskItem = ({ task, onDelete }) => {
  return (
    <ListItem divider>
      <ListItemText
        primary={task.title}
        secondary={task.description}
      />
      <Chip
        label={task.status}
        color={getStatusColor(task.status)}
        variant="filled"
        sx={{ mr: 2 }}
      />
      <ListItemSecondaryAction>
        <IconButton component={Link} to={`/edit/${task.id}`} sx={{ mr: 1 }}>
          <Edit />
        </IconButton>
        <Tooltip title={task.status === 'completed' ? 'No se puede eliminar una tarea completada' : 'Eliminar'}>
          <span>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => onDelete(task.id)}
              disabled={task.status === 'completed'}
            >
              <Delete />
            </IconButton>
          </span>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TaskItem;

