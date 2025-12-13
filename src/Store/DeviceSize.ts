import { BehaviorSubject } from 'rxjs';

interface DeviceSize {
  readonly width: number;
  readonly height: number;
  readonly devicePixelRatio: number;
}

export const deviceSize$ = new BehaviorSubject<DeviceSize>({
  width: 1,
  height: 2,
  devicePixelRatio: 2
});
