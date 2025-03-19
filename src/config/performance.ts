import { initializeApp } from 'firebase/app';
import { getPerformance, trace, PerformanceTrace } from 'firebase/performance';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // Outras configurações
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Performance Monitoring
const performance = getPerformance(app);

// Classe de Monitoramento de Performance
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  
  private constructor() {}

  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // Método para iniciar trace
  startTrace(traceName: string): PerformanceTrace {
    return trace(performance, traceName);
  }

  // Medir tempo de carregamento de página
  measurePageLoad() {
    const pageLoadTrace = this.startTrace('page_load');
    
    window.addEventListener('load', () => {
      pageLoadTrace.stop();
    });
  }

  // Medir tempo de operações assíncronas
  async measureAsyncOperation<T>(
    operationName: string, 
    operation: () => Promise<T>
  ): Promise<T> {
    const operationTrace = this.startTrace(operationName);
    
    try {
      const result = await operation();
      operationTrace.stop();
      return result;
    } catch (error) {
      operationTrace.stop();
      throw error;
    }
  }

  // Adicionar atributos personalizados ao trace
  addTraceAttribute(trace: PerformanceTrace, key: string, value: string) {
    trace.setAttribute(key, value);
  }
}

// Singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance();
