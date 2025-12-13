import { BehaviorSubject, Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { Manager } from './Models/Manager';
import { CameraWrapper } from '@Engine/Camera/CameraWrapper';
import type { WrappedCamera } from '@Engine/Camera/Models/WrappedCamera';
import type { CameraParams } from '@Engine/Camera/Models/CameraParams';

export function CameraManager(): Manager<WrappedCamera> {
  const current$ = new BehaviorSubject<WrappedCamera | undefined>(undefined);
  const list$ = new BehaviorSubject<ReadonlyArray<WrappedCamera>>([]);
  const destroyed$ = new Subject<void>();

  function create(params: CameraParams): WrappedCamera {
    const wrapper = CameraWrapper(params);
    list$.next([...list$.value, wrapper]);
    return wrapper;
  }

  // TODO (S.Panfilov) maybe check if the entity in the list (also same for all managers)
  const setCurrent = (camera: WrappedCamera): void => current$.next(camera);

  function destroy() {
    current$.complete();
    list$.complete();
    destroyed$.next();
    destroyed$.complete();
  }

  return { id: `camera_manager_${nanoid()}`, create, setCurrent, current$, list$, destroy, destroyed$ };
}
