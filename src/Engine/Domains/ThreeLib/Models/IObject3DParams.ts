import type { IEulerWrapper, IVector3Wrapper } from '@/Engine/Wrappers';

import type { IObject3DProps } from './IObject3DProps';

export type IObject3DParams = Omit<IObject3DProps, 'position' | 'rotation' | 'scale'> & Readonly<{
  position?: IVector3Wrapper;
  rotation?: IEulerWrapper;
  scale?: IVector3Wrapper;
}>;
