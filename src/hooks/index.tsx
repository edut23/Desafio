import React from 'react';
import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { ChatProvider } from './chat';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <ChatProvider>
        <ToastProvider>{children}</ToastProvider>
      </ChatProvider>
    </AuthProvider>
  );
};

export default AppProvider;
