import type { IVector3Wrapper } from '@/Engine/Vector';

export type ICameraProps = Readonly<{
  fov?: number;
  near?: number;
  far?: number;
  lookAt?: IVector3Wrapper;
}>;
