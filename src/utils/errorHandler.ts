import { FirebaseError } from 'firebase/app';

// Mapeamento de códigos de erro do Firebase
const FIREBASE_ERROR_MESSAGES: { [key: string]: string } = {
  'auth/invalid-email': 'Email inválido.',
  'auth/user-disabled': 'Usuário desabilitado.',
  'auth/user-not-found': 'Usuário não encontrado.',
  'auth/wrong-password': 'Senha incorreta.',
  'auth/email-already-in-use': 'Email já está em uso.',
  'auth/operation-not-allowed': 'Operação não permitida.',
  'auth/weak-password': 'Senha muito fraca.',
};

// Classe de Tratamento de Erros
export class ErrorHandler {
  // Método para lidar com erros do Firebase
  static handleFirebaseError(error: FirebaseError): string {
    const errorCode = error.code;
    return FIREBASE_ERROR_MESSAGES[errorCode] || 'Erro desconhecido. Tente novamente.';
  }

  // Método para registrar erros
  static logError(error: Error, context?: string) {
    console.error(`[${context || 'Global Error Handler'}]`, error);
    
    // Opcional: Enviar para serviço de monitoramento
    this.reportErrorToMonitoringService(error, context);
  }

  // Método para reportar erros para serviço de monitoramento
  private static reportErrorToMonitoringService(error: Error, context?: string) {
    // Implementação de envio para serviço de monitoramento (opcional)
    // Pode ser integrado com Sentry, Firebase Crashlytics, etc.
  }

  // Método para tratamento de erros assíncronos
  static async asyncErrorHandler<T>(
    asyncFunc: () => Promise<T>, 
    errorHandler?: (error: Error) => void
  ): Promise<T | null> {
    try {
      return await asyncFunc();
    } catch (error) {
      if (error instanceof Error) {
        this.logError(error);
        
        if (errorHandler) {
          errorHandler(error);
        }
      }
      return null;
    }
  }
}

// Tratamento de erros não capturados
window.addEventListener('unhandledrejection', (event) => {
  ErrorHandler.logError(event.reason, 'Unhandled Promise Rejection');
});

window.addEventListener('error', (event) => {
  ErrorHandler.logError(event.error, 'Unhandled Error');
});
