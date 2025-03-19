import { useEffect } from 'react';
import { useAuth } from './useAuth';
import { realtimeService } from '../services/RealtimeService';

export const useRealtime = (listId?: string) => {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Inscrever para atualizações em tempo real
      realtimeService.subscribeToTasks(user.uid, listId);
      realtimeService.subscribeToLists(user.uid);

      // Limpar inscrições ao desmontar
      return () => {
        realtimeService.unsubscribeAll();
      };
    }
  }, [user, listId]);
};
