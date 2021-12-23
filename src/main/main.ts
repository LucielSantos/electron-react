/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { TodoRepository } from '../database/repositories/todo';
import DatabaseBuilder from '../database/Database';
import ExpressServerBuilder from '../api';
import ApiBuilder from '../service';
import Store from 'electron-store';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

// Build Database
export const database = new DatabaseBuilder();

// Build electron store
export const store = new Store({ name: 'store' });

// Build api
export const api = new ApiBuilder();

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDevelopment) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: true,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }

    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  // Build Express server
  // eslint-disable-next-line
  new ExpressServerBuilder(mainWindow);

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
  // app.hide();
});

app
  .whenReady()
  .then(() => {
    createWindow();

    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);

ipcMain.on('electron-store-get', (event, val) => {
  event.returnValue = store.get(val);
});

ipcMain.on('electron-store-set', async (_, key, val) => {
  store.set(key, val);
});

ipcMain.on('save-todo', async (_, todo) => {
  const todoRepository = new TodoRepository();

  await todoRepository.save(todo);
});

ipcMain.on('get-todos', async (event) => {
  const todoRepository = new TodoRepository();

  event.returnValue = await todoRepository.getAll();
});

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
    console.log(store.path);

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
    console.log(error);
  }

  event.returnValue = true;
});
