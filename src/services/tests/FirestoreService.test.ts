import { firestoreService } from '../FirestoreService';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { Task, List } from '../../types';

// Mock do Firebase
jest.mock('firebase/firestore', () => ({
  ...jest.requireActual('firebase/firestore'),
  getFirestore: jest.fn(),
  collection: jest.fn(),
  addDoc: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn()
}));

describe('FirestoreService', () => {
  const mockUserId = 'user123';
  const mockTask: Omit<Task, 'id'> = {
    userId: mockUserId,
    listId: 'list1',
    title: 'Test Task',
    completed: false,
    important: false,
    createdAt: new Date()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('createTask should add a new task', async () => {
    const mockDocRef = { id: 'task1' };
    (addDoc as jest.Mock).mockResolvedValue(mockDocRef);

    const taskId = await firestoreService.createTask(mockTask);
    
    expect(addDoc).toHaveBeenCalled();
    expect(taskId).toBe('task1');
  });

  test('getTasks should fetch tasks for a user', async () => {
    const mockTasks = [
      { id: 'task1', ...mockTask },
      { id: 'task2', ...mockTask }
    ];

    (query as jest.Mock).mockReturnValue({});
    (getDocs as jest.Mock).mockResolvedValue({
      docs: mockTasks.map(task => ({
        id: task.id,
        data: () => task
      }))
    });

    const tasks = await firestoreService.getTasks('list1');
    
    expect(tasks.length).toBe(2);
    expect(tasks[0].title).toBe('Test Task');
  });
});
