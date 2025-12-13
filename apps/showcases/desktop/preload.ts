import { contextBridge, ipcRenderer } from 'electron';
import { packageJsonVersion } from './src/Generated';
import { platformApiChannel, platformApiName } from './src/Constants';

contextBridge.exposeInMainWorld(platformApiName, {
  // TODO DESKTOP: define actions enum
  // TODO DESKTOP: any
  saveAppSettings: (settings: any): Promise<void> => ipcRenderer.invoke(platformApiChannel, 'app:settings:save', settings),
  // TODO DESKTOP: any
  loadAppSettings: (): Promise<any> => ipcRenderer.invoke(platformApiChannel, 'app:settings:save'),
  node: (): string => process.versions.node,
  chrome: (): string => process.versions.chrome,
  electron: (): string => process.versions.electron,
  desktopAppVersion: async (): Promise<string> => packageJsonVersion
});
