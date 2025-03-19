import React, { useState } from 'react';
import { 
  Menu, 
  MenuItem, 
  IconButton, 
  ListItemIcon, 
  ListItemText 
} from '@mui/material';
import { 
  MoreVert as MoreVertIcon,
  Star as StarIcon,
  Repeat as RepeatIcon,
  Notifications as NotificationsIcon,
  CalendarToday as CalendarTodayIcon
} from '@mui/icons-material';
import { Task } from '../../types';
import { firestoreService } from '../../services/FirestoreService';

interface TaskOptionsProps {
  task: Task;
  onUpdateTask: (updatedTask: Task) => void;
}

const TaskOptions: React.FC<TaskOptionsProps> = ({ task, onUpdateTask }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleToggleImportant = async () => {
    const updatedTask = { ...task, important: !task.important };
    await firestoreService.updateTask(task.id, updatedTask);
    onUpdateTask(updatedTask);
    handleCloseMenu();
  };

  const handleAddReminder = () => {
    // Implementar lógica de adicionar lembrete
    handleCloseMenu();
  };

  const handleSetRepeat = () => {
    // Implementar lógica de tarefa recorrente
    handleCloseMenu();
  };

  const handleAddDueDate = () => {
    // Implementar lógica de data de vencimento
    handleCloseMenu();
  };

  return (
    <>
      <IconButton onClick={handleOpenMenu}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleToggleImportant}>
          <ListItemIcon>
            <StarIcon color={task.important ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary={task.important ? 'Remover Importante' : 'Marcar como Importante'} />
        </MenuItem>
        <MenuItem onClick={handleAddReminder}>
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary="Adicionar Lembrete" />
        </MenuItem>
        <MenuItem onClick={handleSetRepeat}>
          <ListItemIcon>
            <RepeatIcon />
          </ListItemIcon>
          <ListItemText primary="Repetir Tarefa" />
        </MenuItem>
        <MenuItem onClick={handleAddDueDate}>
          <ListItemIcon>
            <CalendarTodayIcon />
          </ListItemIcon>
          <ListItemText primary="Adicionar Data de Vencimento" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default TaskOptions;
import React, { useState } from 'react';
import { 
  Menu, 
  MenuItem, 
  IconButton, 
  ListItemIcon, 
  ListItemText 
} from '@mui/material';
import { 
  MoreVert as MoreVertIcon,
  Star as StarIcon,
  Repeat as RepeatIcon,
  Notifications as NotificationsIcon,
  CalendarToday as CalendarTodayIcon
} from '@mui/icons-material';
import { Task } from '../../types';
import { firestoreService } from '../../services/FirestoreService';

interface TaskOptionsProps {
  task: Task;
  onUpdateTask: (updatedTask: Task) => void;
}

const TaskOptions: React.FC<TaskOptionsProps> = ({ task, onUpdateTask }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleToggleImportant = async () => {
    const updatedTask = { ...task, important: !task.important };
    await firestoreService.updateTask(task.id, updatedTask);
    onUpdateTask(updatedTask);
    handleCloseMenu();
  };

  const handleAddReminder = () => {
    // Implementar lógica de adicionar lembrete
    handleCloseMenu();
  };

  const handleSetRepeat = () => {
    // Implementar lógica de tarefa recorrente
    handleCloseMenu();
  };

  const handleAddDueDate = () => {
    // Implementar lógica de data de vencimento
    handleCloseMenu();
  };

  return (
    <>
      <IconButton onClick={handleOpenMenu}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleToggleImportant}>
          <ListItemIcon>
            <StarIcon color={task.important ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary={task.important ? 'Remover Importante' : 'Marcar como Importante'} />
        </MenuItem>
        <MenuItem onClick={handleAddReminder}>
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary="Adicionar Lembrete" />
        </MenuItem>
        <MenuItem onClick={handleSetRepeat}>
          <ListItemIcon>
            <RepeatIcon />
          </ListItemIcon>
          <ListItemText primary="Repetir Tarefa" />
        </MenuItem>
        <MenuItem onClick={handleAddDueDate}>
          <ListItemIcon>
            <CalendarTodayIcon />
          </ListItemIcon>
          <ListItemText primary="Adicionar Data de Vencimento" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default TaskOptions;
