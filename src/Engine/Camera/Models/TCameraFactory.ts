import type { TParamsFromConfigWithDependencies, TReactiveFactory } from '@/Engine/Abstract';

import type { TAnyCameraWrapper } from './TAnyCameraWrapper';
import type { TCameraServiceDependencies } from './TCameraServiceDependencies';
import type { TCommonCameraConfig } from './TCommonCameraConfig';
import type { TCommonCameraParams } from './TCommonCameraParams';

export type TCameraFactory = TReactiveFactory<TAnyCameraWrapper, TCommonCameraParams, TCameraServiceDependencies> &
  TParamsFromConfigWithDependencies<TCommonCameraConfig, TCommonCameraParams, TCameraServiceDependencies>;
