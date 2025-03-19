import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Páginas
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import ListTasks from '../pages/ListTasks';

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    return user ? children : <Navigate to="/login" replace />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/login" 
          element={user ? <Navigate to="/dashboard" replace /> : <Login />} 
        />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/list/:listId" 
          element={
            <PrivateRoute>
              <ListTasks />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/" 
          element={<Navigate to="/dashboard" replace />} 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
