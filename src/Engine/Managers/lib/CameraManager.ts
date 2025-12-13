import { BehaviorSubject, Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { Manager } from '../Models/Manager';
import type { CameraParams } from '@Engine/Camera/CameraWrapper';
import { CameraWrapper } from '@Engine/Camera/CameraWrapper';
import type { WrappedCamera } from '@Engine/Camera/Models/WrappedCamera';

export function CameraManager(): Manager {
  const destroyed$ = new Subject<void>();
  const cameras$ = new BehaviorSubject<WrappedCamera | undefined>(undefined);

  const createCamera = (params: CameraParams): void => cameras$.next(CameraWrapper(params));

  function destroy() {
    cameras$.complete();
    destroyed$.next();
    destroyed$.complete();
  }

  return { id: `camera_manager_${nanoid()}`, createCamera, cameras$, destroy, destroyed$ };
}
