import { deviceSize$ } from '../Store/DeviceSize';

function onResize(): void {
  console.log('resize');
  deviceSize$.next({
    // TODO (S.Panfilov) global?
    width: window.innerWidth,
    // TODO (S.Panfilov) global?
    height: window.innerHeight,
    devicePixelRatio: deviceSize$.value.devicePixelRatio
  });
}

// TODO (S.Panfilov) global?
export const startWatchResize = (): void => window.addEventListener('resize', onResize);
// TODO (S.Panfilov) global?
export const stopWatchResize = (): void => window.removeEventListener('resize', onResize);
