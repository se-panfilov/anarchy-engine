import { BehaviorSubject, Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { Manager } from '../Models/Manager';
import { LightWrapper } from '@Engine/Light/LightWrapper';
import type { WrappedLight } from '@Engine/Light/Models/WrappedLight';
import type { LightParams } from '@Engine/Light/Models/LightParams';

export function LightManager(): Manager {
  const destroyed$ = new Subject<void>();
  const lights$ = new BehaviorSubject<WrappedLight | undefined>(undefined);

  const createLight = (params: LightParams): void => lights$.next(LightWrapper(params));

  function destroy() {
    lights$.complete();
    destroyed$.next();
    destroyed$.complete();
  }

  return { id: `light_manager_${nanoid()}`, createLight, lights$, destroy, destroyed$ };
}
