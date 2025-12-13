import type { TActive, TWithName } from '@/Engine/Mixins';
import type { TVector3Wrapper } from '@/Engine/Vector';

export type TCameraProps = Readonly<{
  fov?: number;
  near?: number;
  far?: number;
  lookAt?: TVector3Wrapper;
}> &
  TWithName &
  TActive;
