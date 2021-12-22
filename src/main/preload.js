const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    on(channel, func) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    },
    once(channel, func) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    },
  },
  store: {
    get(val) {
      return ipcRenderer.sendSync('electron-store-get', val);
    },
    set(property, val) {
      ipcRenderer.send('electron-store-set', property, val);
    },
    setConfig(configs) {
      ipcRenderer.send('set-config', configs);
    },
    getConfig() {
      return ipcRenderer.sendSync('get-config');
    },
    // Other method you want to add like has(), reset(), etc.
  },
  saveTodo(newTodo) {
    ipcRenderer.send('save-todo', newTodo);
  },
  getTodos() {
    return ipcRenderer.sendSync('get-todos');
  },
  sendMessage(message) {
    return ipcRenderer.sendSync('send-message', message);
  },
});
