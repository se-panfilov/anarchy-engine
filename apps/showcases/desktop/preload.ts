import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  // TODO DESKTOP: "ping" is just a test api, remove it.
  ping: () => ipcRenderer.invoke('ping'),
  // TODO DESKTOP: "readConfig" is an example of reading file.
  readConfig: () => ipcRenderer.invoke('read-config')
});
