import { PlatformActions } from '@Showcases/Desktop/Constants';
import type { THandleRequestDependencies } from '@Showcases/Desktop/Models';
import { isPlatformAction } from '@Showcases/Desktop/Utils';
import { isLoadDocPayload, isPartialSettings, isSettings } from '@Showcases/Shared';
import type { IpcMainInvokeEvent } from 'electron';

export async function handleAppRequest(
  { settingsService, docsService, desktopAppService }: THandleRequestDependencies,
  _event: IpcMainInvokeEvent,
  args: [PlatformActions | string, unknown]
): Promise<any> {
  const type: PlatformActions | string = args[0];
  if (!isPlatformAction(type)) throw new Error(`[DESKTOP] Unknown platform action: ${type}`);
  const payload: unknown = args[1];
  let isRestartNeeded: boolean = false;

  switch (type) {
    case PlatformActions.SetAppSettings:
      // TODO DESKTOP: Async events here should trigger a global loader (we need to implement one)
      // TODO DESKTOP: Should we let menu (and the app) know that the save is done?
      if (!isSettings(payload)) throw new Error(`[DESKTOP] Failed to save settings: Invalid payload`);
      await settingsService.setAppSettings(payload);
      isRestartNeeded = settingsService.applyPlatformSettings(payload);
      if (isRestartNeeded) desktopAppService.restartApp();
      return null;
    case PlatformActions.GetAppSettings:
      return settingsService.getAppSettings();
    case PlatformActions.GetPackagesVersions:
      return { ...(await desktopAppService.getPackagesVersions()), desktop: __DESKTOP_APP_VERSION__ };
    case PlatformActions.GetReleaseName:
      return `${import.meta.env.VITE_RELEASE_NAME_PREFIX}@${__DESKTOP_APP_VERSION__}`;
    case PlatformActions.GetPreferredLocales:
      return settingsService.getPreferredLocales();
    case PlatformActions.UpdateAppSettings:
      if (!isPartialSettings(payload)) throw new Error(`[DESKTOP] Failed to update settings: Invalid payload`);
      return settingsService.updateAppSettings(payload);
    case PlatformActions.GetLegalDocs:
      if (!isLoadDocPayload(payload)) throw new Error(`[DESKTOP] Failed to load legal docs: Invalid payload`);
      return docsService.get(payload);
    case PlatformActions.AppExit:
      return desktopAppService.closeApp();
    case PlatformActions.AppRestart:
      return desktopAppService.restartApp();
    default:
      throw new Error(`[DESKTOP] Unknown platform action: ${type}`);
  }
}
