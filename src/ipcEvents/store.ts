import { ipcMain } from 'electron';
import Store from 'electron-store';
import ApiBuilder from '../service';

export const buildStoreEvents = (store: Store, api: ApiBuilder) => {
  // Messages config
  ipcMain.on(
    'set-config',
    async (
      event,
      config: {
        serverPort: string;
        listenerIp: string;
        listenerPort: string;
        name: string;
      }
    ) => {
      event.reply('test-config', 'test');

      store.set('name', config.name);
      store.set('serverPort', config.serverPort);
      store.set('listenerIp', config.listenerIp);
      store.set('listenerPort', config.listenerPort);

      api.build({
        listenerIp: config.listenerIp,
        listenerPort: config.listenerPort,
      });
    }
  );

  ipcMain.on('get-config', async (event) => {
    const configs = {
      name: store.get('name') || null,
      serverPort: store.get('serverPort') || null,
      listenerIp: store.get('listenerIp') || null,
      listenerPort: store.get('listenerPort') || null,
    };

    event.returnValue = configs;
  });

  ipcMain.on('send-message', async (event, message: string) => {
    const name = store.get('name');

    try {
      await api.serverApi.post('/receive-message', { text: message, name });
    } catch (error) {
      console.error(error);
    }

    event.returnValue = true;
  });
};
