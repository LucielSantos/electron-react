import { Todo } from './types/todo';

declare global {
  interface Window {
    electron: {
      store: {
        get: (key: string) => any;
        set: (key: string, val: any) => void;
        setConfig: (configs: {
          name: string;
          serverPort: string;
          listenerIp: string;
          listenerPort: string;
        }) => void;
        getConfig: () => {
          serverPort: string | null;
          listenerIp: string | null;
          listenerPort: string | null;
        };
      };
      saveTodo: (todo: Todo) => void;
      getTodos: () => Promise<Todo[]>;
      sendMessage: (message: string) => Promise<void>;
      ipcRenderer: {
        once: (chanel: string, callback: (params: any[]) => any) => void;
        on: (chanel: string, callback: (...params: any[]) => any) => void;
      };
    };
  }
}
