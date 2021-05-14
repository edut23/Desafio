import React from 'react';
import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { ChatProvider } from './chat';
import { TeamProvider } from './team'

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <TeamProvider>
        <ChatProvider>
          <ToastProvider>{children}</ToastProvider>
        </ChatProvider>
      </TeamProvider>
    </AuthProvider>
  );
};

export default AppProvider;
