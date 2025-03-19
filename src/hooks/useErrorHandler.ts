import { useState } from 'react';
import { ErrorHandler } from '../utils/errorHandler';

export const useErrorHandler = () => {
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: Error) => {
    let errorMessage = err.message;

    // Se for um erro do Firebase, traduzir
    if ('code' in err) {
      errorMessage = ErrorHandler.handleFirebaseError(err as any);
    }

    setError(errorMessage);
    ErrorHandler.logError(err);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    error,
    handleError,
    clearError
  };
};
