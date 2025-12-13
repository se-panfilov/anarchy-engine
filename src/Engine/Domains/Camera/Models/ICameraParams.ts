import type { CameraTag } from '@/Engine/Domains/Camera/Constants';
import type { IWithReadonlyTags } from '@/Engine/Mixins';
import type { IEulerWrapper, IVector3Wrapper } from '@/Engine/Wrappers';

export type ICameraParams = Readonly<{
  fov?: number;
  near?: number;
  far?: number;
  position: IVector3Wrapper;
  rotation: IEulerWrapper;
}> &
  IWithReadonlyTags<CameraTag>;
