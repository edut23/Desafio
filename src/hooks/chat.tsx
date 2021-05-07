import React, { createContext, useCallback, useState, useContext } from 'react';

interface ChatContextData {
  addMessage(message: string, userName: string): Promise<void>;
  messages: Message[];
  clearMessages(): void;
}

export interface Message {
  message: string;
  userName: string;
}

const ChatContext = createContext<ChatContextData>({} as ChatContextData);

export const ChatProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem('@Challenge:chat');

    if (savedMessages) {
      return JSON.parse(savedMessages);
    }
    return [{ message: '', userName: '' }];
  });

  // const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = useCallback(
    async (message: string, userName: string) => {
      const savedMessages = localStorage.getItem('@Challenge:chat');
      let addingMessage = messages;
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
        addingMessage = JSON.parse(savedMessages);
      }

      if (addingMessage.length > 10) {
        addingMessage.splice(0, 1);
      }

      addingMessage.push({ message, userName });

      localStorage.setItem('@Challenge:chat', JSON.stringify(addingMessage));

      setMessages([...addingMessage]);
    },
    [messages],
  );

  const clearMessages = useCallback(() => {
    localStorage.removeItem('@Challenge:chat');
    setMessages([]);
  }, []);

  return (
    <ChatContext.Provider value={{ addMessage, messages, clearMessages }}>
      {children}
    </ChatContext.Provider>
  );
};

export function useChat(): ChatContextData {
  const context = useContext(ChatContext);

  return context;
}
