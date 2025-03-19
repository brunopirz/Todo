export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
}

export interface List {
  id: string;
  userId: string;
  title: string;
  color: string;
  createdAt: Date;
  isDefault?: boolean;
}

export interface Task {
  id: string;
  listId: string;
  userId: string;
  title: string;
  notes?: string;
  dueDate?: Date;
  reminderDate?: Date;
  completed: boolean;
  important: boolean;
  steps?: TaskStep[];
  createdAt: Date;
  completedAt?: Date;
}

export interface TaskStep {
  id: string;
  title: string;
  completed: boolean;
}

export enum DefaultLists {
  MyDay = 'Meu Dia',
  Important = 'Importante',
  Planned = 'Planejado',
  Tasks = 'Tarefas'
}
