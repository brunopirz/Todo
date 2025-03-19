import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  getDocs,
  getDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { List, Task, User, DefaultLists } from '../types';

export class FirestoreService {
  // Métodos de Lista
  async createList(list: Omit<List, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'lists'), list);
    return docRef.id;
  }

  async getLists(userId: string): Promise<List[]> {
    const q = query(collection(db, 'lists'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as List));
  }

  async updateList(listId: string, data: Partial<List>): Promise<void> {
    const listRef = doc(db, 'lists', listId);
    await updateDoc(listRef, data);
  }

  async deleteList(listId: string): Promise<void> {
    await deleteDoc(doc(db, 'lists', listId));
  }

  // Métodos de Tarefa
  async createTask(task: Omit<Task, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'tasks'), task);
    return docRef.id;
  }

  async getTasks(listId: string): Promise<Task[]> {
    const q = query(collection(db, 'tasks'), where('listId', '==', listId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Task));
  }

  async updateTask(taskId: string, data: Partial<Task>): Promise<void> {
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, data);
  }

  async deleteTask(taskId: string): Promise<void> {
    await deleteDoc(doc(db, 'tasks', taskId));
  }

  // Métodos de Usuário
  async createDefaultLists(user: User): Promise<void> {
    const defaultLists: Omit<List, 'id'>[] = [
      {
        userId: user.uid,
        title: DefaultLists.MyDay,
        color: '#0078D4',
        createdAt: new Date(),
        isDefault: true
      },
      {
        userId: user.uid,
        title: DefaultLists.Important,
        color: '#FF6B6B',
        createdAt: new Date(),
        isDefault: true
      },
      {
        userId: user.uid,
        title: DefaultLists.Planned,
        color: '#4CAF50',
        createdAt: new Date(),
        isDefault: true
      },
      {
        userId: user.uid,
        title: DefaultLists.Tasks,
        color: '#9C27B0',
        createdAt: new Date(),
        isDefault: true
      }
    ];

    for (const list of defaultLists) {
      await this.createList(list);
    }
  }
}

export const firestoreService = new FirestoreService();
