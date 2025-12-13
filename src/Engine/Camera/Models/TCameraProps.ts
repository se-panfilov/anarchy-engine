import type { IActive, IWithName } from '@/Engine/Mixins';
import type { TVector3Wrapper } from '@/Engine/Vector';

export type TCameraProps = Readonly<{
  fov?: number;
  near?: number;
  far?: number;
  lookAt?: TVector3Wrapper;
}> &
  IWithName &
  IActive;
