import { useEffect, useState } from 'react';

export const useMessage = () => {
  const [messages, setMessages] = useState<{ text: string; name: string }[]>(
    []
  );

  useEffect(() => {
    window.electron.ipcRenderer.on(
      'receive-message',
      (newMessage: { text: string; name: string }) => {
        setMessages((prev) => [newMessage, ...prev]);
      }
    );
  }, []);

  return { messages };
};
