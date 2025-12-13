import type { IpcMainInvokeEvent } from 'electron';

// TODO DESKTOP: fix handling of the events
// TODO DESKTOP: any
export function handleAppRequest(_event: IpcMainInvokeEvent, ...args: ReadonlyArray<any>): Promise<any> | any {
  console.log('XXX event', args);

  return 'pong';
  //   ping
  //   readConfig
  //   node
  //   chrome
  //   electron
}
