import { PlatformActions } from '@Desktop/Constants';
import { isPlatformAction } from '@Desktop/Utils';
import type { App, IpcMainInvokeEvent } from 'electron';

// TODO DESKTOP: fix handling of the events
// TODO DESKTOP: any
export function handleAppRequest(app: App, _event: IpcMainInvokeEvent, ...args: [PlatformActions | string, unknown]): Promise<any> | any {
  const type: PlatformActions | string = args[0];
  if (!isPlatformAction(type)) throw new Error(`[DESKTOP]: Unknown platform action: ${type}`);
  const payload: unknown = args[1];

  switch (type) {
    case PlatformActions.SaveAppSettings:
      // TODO DESKTOP: implement saving app settings
      return Promise.resolve();
    case PlatformActions.LoadAppSettings:
      // TODO DESKTOP: implement loading app settings
      return Promise.resolve({});
    default:
      throw new Error(`Unknown platform action: ${type}`);
  }
}
