import tasksReducer, { 
  fetchTasksStart, 
  fetchTasksSuccess, 
  fetchTasksFailure,
  addTask,
  updateTask,
  deleteTask
} from '../tasksSlice';
import { Task } from '../../types';

describe('tasksSlice Reducer', () => {
  const initialState = {
    tasks: [],
    loading: false,
    error: null
  };

  const mockTask: Task = {
    id: 'task1',
    userId: 'user123',
    listId: 'list1',
    title: 'Test Task',
    completed: false,
    important: false,
    createdAt: new Date()
  };

  test('should handle fetchTasksStart', () => {
    const nextState = tasksReducer(initialState, fetchTasksStart());
    
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  test('should handle fetchTasksSuccess', () => {
    const nextState = tasksReducer(
      initialState, 
      fetchTasksSuccess([mockTask])
    );
    
    expect(nextState.tasks).toEqual([mockTask]);
    expect(nextState.loading).toBe(false);
  });

  test('should handle addTask', () => {
    const nextState = tasksReducer(
      initialState, 
      addTask(mockTask)
    );
    
    expect(nextState.tasks).toContain(mockTask);
  });
});
