import React, { useState, useMemo } from 'react';
import { 
  ThemeProvider, 
  CssBaseline 
} from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { AuthProvider } from './contexts/AuthContext';
import { lightTheme, darkTheme } from './styles/theme';
import AppRoutes from './routes';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = useMemo(
    () => (isDarkMode ? darkTheme : lightTheme),
    [isDarkMode]
  );

  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRoutes />
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;
