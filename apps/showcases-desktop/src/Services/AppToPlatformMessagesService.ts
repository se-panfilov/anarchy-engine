import { PlatformActions } from '@Desktop/Constants';
import type { IpcMainInvokeEvent } from 'electron';

// TODO DESKTOP: fix handling of the events
export function handleAppRequest(_event: IpcMainInvokeEvent, ...args: [PlatformActions, unknown]): Promise<any> | any {
  const type: PlatformActions = args[0];
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
