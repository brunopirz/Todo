import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  Checkbox,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions
} from '@mui/material';
import { 
  Add as AddIcon, 
  Delete as DeleteIcon, 
  Edit as EditIcon 
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { firestoreService } from '../../services/FirestoreService';
import { Task } from '../../types';

const ListTasks: React.FC = () => {
  const { listId } = useParams();
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [currentTask, setCurrentTask] = useState<Partial<Task> | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      if (listId && user) {
        const listTasks = await firestoreService.getTasks(listId);
        setTasks(listTasks);
      }
    };

    fetchTasks();
  }, [listId, user]);

  const handleOpenTaskDialog = (task?: Task) => {
    setCurrentTask(task ? { ...task } : { 
      listId: listId!, 
      userId: user!.uid,
      title: '',
      completed: false,
      important: false,
      createdAt: new Date()
    });
    setOpenTaskDialog(true);
  };

  const handleCloseTaskDialog = () => {
    setOpenTaskDialog(false);
    setCurrentTask(null);
  };

  const handleSaveTask = async () => {
    if (currentTask) {
      if (currentTask.id) {
        // Atualizar tarefa existente
        await firestoreService.updateTask(currentTask.id, currentTask);
        setTasks(tasks.map(t => t.id === currentTask.id ? currentTask as Task : t));
      } else {
        // Criar nova tarefa
        const newTaskId = await firestoreService.createTask(currentTask as Omit<Task, 'id'>);
        setTasks([...tasks, { ...currentTask, id: newTaskId } as Task]);
      }
      handleCloseTaskDialog();
    }
  };

  const handleToggleTaskCompletion = async (task: Task) => {
    const updatedTask = { 
      ...task, 
      completed: !task.completed,
      completedAt: !task.completed ? new Date() : undefined
    };
    await firestoreService.updateTask(task.id, updatedTask);
    setTasks(tasks.map(t => t.id === task.id ? updatedTask : t));
  };

  const handleDeleteTask = async (taskId: string) => {
    await firestoreService.deleteTask(taskId);
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
        <Typography variant="h4">Tarefas da Lista</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => handleOpenTaskDialog()}
        >
          Nova Tarefa
        </Button>
      </Box>

      <List>
        {tasks.map(task => (
          <ListItem 
            key={task.id}
            secondaryAction={
              <>
                <IconButton 
                  edge="end" 
                  aria-label="edit"
                  sx={{ mr: 1 }}
                  onClick={() => handleOpenTaskDialog(task)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton 
                  edge="end" 
                  aria-label="delete"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <Checkbox
              checked={task.completed}
              onChange={() => handleToggleTaskCompletion(task)}
            />
            <ListItemText 
              primary={task.title} 
              secondary={task.notes}
              sx={{ 
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? 'text.secondary' : 'inherit'
              }}
            />
          </ListItem>
        ))}
      </List>

      <Dialog open={openTaskDialog} onClose={handleCloseTaskDialog}>
        <DialogTitle>
          {currentTask?.id ? 'Editar Tarefa' : 'Nova Tarefa'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Título da Tarefa"
            fullWidth
            value={currentTask?.title || ''}
            onChange={(e) => setCurrentTask(prev => ({ ...prev!, title: e.target.value }))}
          />
          <TextField
            margin="dense"
            label="Descrição"
            fullWidth
            multiline
            rows={4}
            value={currentTask?.notes || ''}
            onChange={(e) => setCurrentTask(prev => ({ ...prev!, notes: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTaskDialog}>Cancelar</Button>
          <Button onClick={handleSaveTask} color="primary">Salvar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ListTasks;
