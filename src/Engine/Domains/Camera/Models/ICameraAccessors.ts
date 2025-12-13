import type { IMovable, IRotatable } from '@/Engine/Domains/Mixins';
import type { IVector3Wrapper } from '@/Engine/Wrappers';

export type ICameraAccessors = IMovable &
  IRotatable &
  Readonly<{
    lookAt: (vector3: IVector3Wrapper) => void;
    setCastShadow: (value: boolean) => boolean;
    setControls: (x: number, y: number, z: number) => IVector3Wrapper;
  }>;
