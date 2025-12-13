import { contextBridge, ipcRenderer } from 'electron';
import { packageJsonVersion } from './src/Generated';
import { APP_TO_PLATFORM_CHANNEL, PLATFORM_API_NAME } from './src/Constants';

contextBridge.exposeInMainWorld(PLATFORM_API_NAME, {
  // TODO DESKTOP: define actions enum
  // TODO DESKTOP: any
  saveAppSettings: (settings: any): Promise<void> => ipcRenderer.invoke(APP_TO_PLATFORM_CHANNEL, 'app:settings:save', settings),
  // TODO DESKTOP: any
  loadAppSettings: (): Promise<any> => ipcRenderer.invoke(APP_TO_PLATFORM_CHANNEL, 'app:settings:save'),
  node: (): string => process.versions.node,
  chrome: (): string => process.versions.chrome,
  electron: (): string => process.versions.electron,
  desktopAppVersion: async (): Promise<string> => packageJsonVersion
});
