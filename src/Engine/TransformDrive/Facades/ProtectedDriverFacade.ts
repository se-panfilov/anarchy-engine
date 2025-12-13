import type { TAbstractTransformDriver, TProtectedTransformDriverFacade } from '@/Engine/TransformDrive/Models';

export function ProtectedDriverFacade<T extends TAbstractTransformDriver>(driver: T): TProtectedTransformDriverFacade<T> {
  return {
    ...driver,
    position$: driver.position$.asObservable(),
    rotation$: driver.rotation$.asObservable(),
    scale$: driver.scale$.asObservable()
  };
}
