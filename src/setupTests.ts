import '@testing-library/jest-dom';
import { server } from './mocks/server';

// Estabelecer mock API antes dos testes
beforeAll(() => server.listen());

// Resetar handlers após cada teste
afterEach(() => server.resetHandlers());

// Limpar após os testes
afterAll(() => server.close());
