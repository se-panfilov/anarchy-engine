import { contextBridge, ipcRenderer } from 'electron';
import { PlatformActions, platformApiChannel, platformApiName } from './src/Constants';
import { TGameSettings } from 'anarchy_engine_shared/src/Showcase';

const { SaveAppSettings, LoadAppSettings } = PlatformActions;

declare const __DESKTOP_APP_VERSION__: string;

contextBridge.exposeInMainWorld(platformApiName, {
  saveAppSettings: (settings: TGameSettings): Promise<void> => ipcRenderer.invoke(platformApiChannel, SaveAppSettings, settings),
  loadAppSettings: (): Promise<TGameSettings> => ipcRenderer.invoke(platformApiChannel, LoadAppSettings),
  node: (): string => process.versions.node,
  chrome: (): string => process.versions.chrome,
  electron: (): string => process.versions.electron,
  desktopAppVersion: async (): Promise<string> => __DESKTOP_APP_VERSION__
});
