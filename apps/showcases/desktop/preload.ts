import { contextBridge, ipcRenderer } from 'electron';
// import { packageJsonVersion } from './src/Generated/versions.js';

// console.log('Module type:', import.meta.url);

// TODO DESKTOP: Const duplications from AppToPlatformMessagesConstants
const APP_TO_PLATFORM_CHANNEL: string = 'app-to-platform-channel';
const PLATFORM_API_NAME: string = 'platformAPI';

contextBridge.exposeInMainWorld(PLATFORM_API_NAME, {
  // TODO DESKTOP: define actions enum
  // TODO DESKTOP: any
  saveAppSettings: (settings: any): Promise<void> => ipcRenderer.invoke(APP_TO_PLATFORM_CHANNEL, 'app:settings:save', settings),
  // TODO DESKTOP: any
  loadAppSettings: (): Promise<any> => ipcRenderer.invoke(APP_TO_PLATFORM_CHANNEL, 'app:settings:save'),
  node: (): string => process.versions.node,
  chrome: (): string => process.versions.chrome,
  electron: (): string => process.versions.electron
  // desktopAppVersion: (): string => packageJsonVersion
});
