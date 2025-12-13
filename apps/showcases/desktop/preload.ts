import { contextBridge, ipcRenderer } from 'electron';
import { packageJsonVersion } from './src/Generated';
import { PlatformActions, platformApiChannel, platformApiName } from './src/Constants';

const { SaveAppSettings, LoadAppSettings } = PlatformActions;

contextBridge.exposeInMainWorld(platformApiName, {
  // TODO DESKTOP: define actions enum
  // TODO DESKTOP: any
  saveAppSettings: (settings: any): Promise<void> => ipcRenderer.invoke(platformApiChannel, SaveAppSettings, settings),
  // TODO DESKTOP: any
  loadAppSettings: (): Promise<any> => ipcRenderer.invoke(platformApiChannel, LoadAppSettings),
  node: (): string => process.versions.node,
  chrome: (): string => process.versions.chrome,
  electron: (): string => process.versions.electron,
  desktopAppVersion: async (): Promise<string> => packageJsonVersion
});
