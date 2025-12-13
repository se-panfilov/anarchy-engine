import { PlatformActions } from '@Showcases/Desktop/Constants';
import type { THandleRequestDependencies } from '@Showcases/Desktop/Models';
import { isPlatformAction } from '@Showcases/Desktop/Utils';
import { isLoadDocPayload, isSettings } from '@Showcases/Shared';
import type { IpcMainInvokeEvent } from 'electron';

// TODO CWP
// TODO DESKTOP: Current task:
//  - [DONE] Implement close app
//  - [DONE] Implement restart app
//  - Split platform and app settings
//  - Implement apply of desktop settings (e.g. resolution)
//  - Implement apply of App settings (e.g. language)
//  - Detect if restart is needed after settings change (and do it)

// TODO DESKTOP: Next task – fix no settings file case:
//  - [DONE] Detect desktop params (e.g. resolution)
//  - [DONE] Apply detected params (as defaults)
//  - [DONE] Send platform settings to the menu (partial delivery of settings, so menu should merge values)

// TODO DESKTOP: any
export async function handleAppRequest(
  { settingsService, docsService, desktopAppService }: THandleRequestDependencies,
  _event: IpcMainInvokeEvent,
  args: [PlatformActions | string, unknown]
): Promise<any> {
  const type: PlatformActions | string = args[0];
  if (!isPlatformAction(type)) throw new Error(`[DESKTOP]: Unknown platform action: ${type}`);
  const payload: unknown = args[1];
  let isRestartNeeded: boolean = false;

  switch (type) {
    case PlatformActions.SaveAppSettings:
      // TODO DESKTOP: Should we let menu (and the app) know that the save is done?
      if (!isSettings(payload)) throw new Error(`[DESKTOP]: Failed to save settings: Invalid payload`);
      await settingsService.saveAppSettings(payload);
      isRestartNeeded = settingsService.applyPlatformSettings(payload);
      if (isRestartNeeded) desktopAppService.restartApp();
      return null;
    case PlatformActions.LoadAppSettings:
      return settingsService.loadAppSettings();
    case PlatformActions.LoadLegalDocs:
      if (!isLoadDocPayload(payload)) throw new Error(`[DESKTOP]: Failed to load legal docs: Invalid payload`);
      return docsService.load(payload);
    case PlatformActions.AppExit:
      return desktopAppService.closeApp();
    case PlatformActions.AppRestart:
      return desktopAppService.restartApp();
    default:
      throw new Error(`[DESKTOP]: Unknown platform action: ${type}`);
  }
}
