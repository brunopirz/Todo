import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider } from '../../contexts/AuthContext';
import { useAuth } from '../useAuth';
import { signInWithPopup, signOut } from 'firebase/auth';

// Mocks
jest.mock('firebase/auth', () => ({
  signInWithPopup: jest.fn(),
  signOut: jest.fn()
}));

const mockUser = {
  uid: 'user123',
  email: 'test@example.com',
  displayName: 'Test User'
};

describe('useAuth Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should handle Google sign in', async () => {
    (signInWithPopup as jest.Mock).mockResolvedValue({ 
      user: mockUser 
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.signInWithGoogle();
    });

    expect(signInWithPopup).toHaveBeenCalled();
  });

  test('should handle logout', async () => {
    (signOut as jest.Mock).mockResolvedValue(undefined);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.logout();
    });

    expect(signOut).toHaveBeenCalled();
  });
});
