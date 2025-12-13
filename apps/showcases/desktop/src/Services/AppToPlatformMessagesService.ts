import type { IpcMainInvokeEvent } from 'electron';

export function handleAppRequest(_event: IpcMainInvokeEvent, ...args: ReadonlyArray<any>): Promise<any> | any {
  console.log('XXX event', args);

  return 'pong';
  //   ping
  //   readConfig
  //   node
  //   chrome
  //   electron
}
