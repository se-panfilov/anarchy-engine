import { BehaviorSubject, Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { Manager } from './Models/Manager';
import { CameraWrapper } from '@Engine/Camera/CameraWrapper';
import type { WrappedCamera } from '@Engine/Camera/Models/WrappedCamera';
import type { CameraParams } from '@Engine/Camera/Models/CameraParams';

interface ICameraManager extends Manager {
  readonly createCamera: (params: CameraParams) => WrappedCamera;
  readonly setCurrentCamera: (camera: WrappedCamera) => WrappedCamera;
  readonly cameras$: BehaviorSubject<WrappedCamera | undefined>;
}

export function CameraManager(): ICameraManager {
  const destroyed$ = new Subject<void>();
  const cameras$ = new BehaviorSubject<WrappedCamera | undefined>(undefined);

  const createCamera = (params: CameraParams): void => cameras$.next(CameraWrapper(params));

  function setAsCurrent(): void {
    // TODO (S.Panfilov)
  }

  function destroy() {
    cameras$.complete();
    destroyed$.next();
    destroyed$.complete();
  }

  return { id: `camera_manager_${nanoid()}`, createCamera, cameras$, destroy, destroyed$ };
}
