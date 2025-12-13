import { contextBridge, ipcRenderer } from 'electron';

// TODO DESKTOP: Const duplications from AppToPlatformMessagesConstants
const APP_TO_PLATFORM_CHANNEL: string = 'app-to-platform-channel';
const PLATFORM_API_NAME: string = 'platformAPI';

contextBridge.exposeInMainWorld(PLATFORM_API_NAME, {
  // TODO DESKTOP: "ping" is just a test api, remove it.
  ping: (num: number) => ipcRenderer.invoke(APP_TO_PLATFORM_CHANNEL, 'arg1', 'arg2', num),
  // TODO DESKTOP: "readConfig" is an example of reading file.
  readConfig: () => ipcRenderer.invoke('read-config'),
  // TODO DESKTOP: debug
  node: (): string => process.versions.node,
  // TODO DESKTOP: debug
  chrome: (): string => process.versions.chrome,
  // TODO DESKTOP: debug
  electron: (): string => process.versions.electron
});
