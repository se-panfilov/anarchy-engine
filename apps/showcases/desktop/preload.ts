// import { contextBridge, ipcRenderer } from 'electron';

const { contextBridge, ipcRenderer } = require('electron');

// TODO DESKTOP: add "sanitize assets" script for desktop/assets and mobile/assets
contextBridge.exposeInMainWorld('electronAPI', {
  // TODO DESKTOP: "ping" is just a test api, remove it.
  ping: () => ipcRenderer.invoke('ping'),
  // TODO DESKTOP: "readConfig" is an example of reading file.
  readConfig: () => ipcRenderer.invoke('read-config')
});
