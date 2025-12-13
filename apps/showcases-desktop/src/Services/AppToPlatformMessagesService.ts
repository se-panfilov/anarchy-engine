import { PlatformActions } from '@Showcases/Desktop/Constants';
import type { THandleRequestDependencies } from '@Showcases/Desktop/Models';
import { isPlatformAction } from '@Showcases/Desktop/Utils';
import { isSettings } from '@Showcases/Shared';
import type { IpcMainInvokeEvent } from 'electron';

// TODO DESKTOP: any
export function handleAppRequest({ settingsService, docsService }: THandleRequestDependencies, _event: IpcMainInvokeEvent, args: [PlatformActions | string, unknown]): Promise<any> | any {
  const type: PlatformActions | string = args[0];
  if (!isPlatformAction(type)) throw new Error(`[DESKTOP]: Unknown platform action: ${type}`);
  const payload: unknown = args[1];

  // TODO DESKTOP: On load/save settings should apply (e.g. resolution), maybe restart is needed.
  // TODO DESKTOP: Implement restart app event
  switch (type) {
    case PlatformActions.SaveAppSettings:
      // TODO DESKTOP: Should we let menu (and the app) know that the save is done? (however, it is sync atm)
      if (!isSettings(payload)) throw new Error(`[DESKTOP]: Failed to save settings: Invalid payload`);
      settingsService.saveAppSettings(payload);
      return Promise.resolve();
    case PlatformActions.LoadAppSettings:
      return Promise.resolve(settingsService.loadAppSettings());
    case PlatformActions.LoadLegalDocs:
      return Promise.resolve(docsService.load(payload));
    default:
      throw new Error(`[DESKTOP]: Unknown platform action: ${type}`);
  }
}
