import { PlatformActions } from '@Showcases/Desktop/Constants';
import type { THandleRequestDependencies } from '@Showcases/Desktop/Models';
import { isPlatformAction } from '@Showcases/Desktop/Utils';
import { isLoadDocPayload, isSettings } from '@Showcases/Shared';
import type { IpcMainInvokeEvent } from 'electron';

// TODO DESKTOP: any
export async function handleAppRequest({ settingsService, docsService }: THandleRequestDependencies, _event: IpcMainInvokeEvent, args: [PlatformActions | string, unknown]): Promise<any> {
  const type: PlatformActions | string = args[0];
  if (!isPlatformAction(type)) throw new Error(`[DESKTOP]: Unknown platform action: ${type}`);
  const payload: unknown = args[1];

  // TODO DESKTOP: Implement restart app event
  switch (type) {
    case PlatformActions.SaveAppSettings:
      // TODO DESKTOP: Should we let menu (and the app) know that the save is done? (however, it is sync atm)
      if (!isSettings(payload)) throw new Error(`[DESKTOP]: Failed to save settings: Invalid payload`);
      // TODO DESKTOP: implement apply of the settings in the app (resolution, etc.), maybe restart is needed.
      await settingsService.saveAppSettings(payload);
      //Important: apply new App-level settings here (and apply play-level settings in a platform code)

      // TODO DESKTOP: remove promise resolve when apply of the settings is implemented
      return Promise.resolve();
    case PlatformActions.LoadAppSettings:
      return settingsService.loadAppSettings();
    case PlatformActions.LoadLegalDocs:
      if (!isLoadDocPayload(payload)) throw new Error(`[DESKTOP]: Failed to load legal docs: Invalid payload`);
      return docsService.load(payload);
    default:
      throw new Error(`[DESKTOP]: Unknown platform action: ${type}`);
  }
}
