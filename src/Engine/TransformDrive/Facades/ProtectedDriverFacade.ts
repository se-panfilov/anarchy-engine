import type { TAbstractDriver, TProtectedDriverFacade } from '@/Engine/TransformDrive/Models';

export function ProtectedDriverFacade<T extends TAbstractDriver>(driver: T): TProtectedDriverFacade<T> {
  return {
    ...driver,
    position$: driver.position$.asObservable(),
    rotation$: driver.rotation$.asObservable(),
    scale$: driver.scale$.asObservable()
  };
}
