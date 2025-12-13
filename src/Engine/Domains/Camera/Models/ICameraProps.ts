import type { IEulerWrapper, IVector3Wrapper } from '@/Engine/Wrappers';

export type ICameraProps = Readonly<{
  fov?: number;
  near?: number;
  far?: number;
  position: IVector3Wrapper;
  rotation: IEulerWrapper;
  lookAt?: IVector3Wrapper;
}>
