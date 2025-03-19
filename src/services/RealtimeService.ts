import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  Unsubscribe 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Task, List } from '../types';
import { store } from '../redux/store';
import { 
  fetchTasksSuccess, 
  addTask, 
  updateTask, 
  deleteTask 
} from '../redux/tasksSlice';
import { 
  fetchListsSuccess, 
  addList, 
  updateList, 
  deleteList 
} from '../redux/listsSlice';

export class RealtimeService {
  private tasksUnsubscribe: Unsubscribe | null = null;
  private listsUnsubscribe: Unsubscribe | null = null;

  subscribeToTasks(userId: string, listId?: string) {
    // Desinscrever de inscrições anteriores
    if (this.tasksUnsubscribe) {
      this.tasksUnsubscribe();
    }

    // Criar query para tarefas
    const tasksQuery = query(
      collection(db, 'tasks'),
      where('userId', '==', userId),
      ...(listId ? [where('listId', '==', listId)] : [])
    );

    // Inscrever para atualizações em tempo real
    this.tasksUnsubscribe = onSnapshot(tasksQuery, (snapshot) => {
      const tasks: Task[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Task));

      // Despachar ações no Redux
      store.dispatch(fetchTasksSuccess(tasks));

      // Processar mudanças
      snapshot.docChanges().forEach((change) => {
        const task = { id: change.doc.id, ...change.doc.data() } as Task;

        switch (change.type) {
          case 'added':
            store.dispatch(addTask(task));
            break;
          case 'modified':
            store.dispatch(updateTask(task));
            break;
          case 'removed':
            store.dispatch(deleteTask(task.id));
            break;
        }
      });
    });
  }

  subscribeToLists(userId: string) {
    // Desinscrever de inscrições anteriores
    if (this.listsUnsubscribe) {
      this.listsUnsubscribe();
    }

    // Criar query para listas
    const listsQuery = query(
      collection(db, 'lists'),
      where('userId', '==', userId)
    );

    // Inscrever para atualizações em tempo real
    this.listsUnsubscribe = onSnapshot(listsQuery, (snapshot) => {
      const lists: List[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as List));

      // Despachar ações no Redux
      store.dispatch(fetchListsSuccess(lists));

      // Processar mudanças
      snapshot.docChanges().forEach((change) => {
        const list = { id: change.doc.id, ...change.doc.data() } as List;

        switch (change.type) {
          case 'added':
            store.dispatch(addList(list));
            break;
          case 'modified':
            store.dispatch(updateList(list));
            break;
          case 'removed':
            store.dispatch(deleteList(list.id));
            break;
        }
      });
    });
  }

  // Limpar inscrições
  unsubscribeAll() {
    if (this.tasksUnsubscribe) {
      this.tasksUnsubscribe();
    }
    if (this.listsUnsubscribe) {
      this.listsUnsubscribe();
    }
  }
}

export const realtimeService = new RealtimeService();
