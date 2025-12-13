import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Camera/Adapters';
import type { TCameraFactory, TCameraParams, TCameraWrapper } from '@/Engine/Camera/Models';
import { CameraWrapper } from '@/Engine/Camera/Wrappers';

const factory: TReactiveFactory<TCameraWrapper, TCameraParams> = ReactiveFactory(FactoryType.Camera, CameraWrapper);
export const CameraFactory = (): TCameraFactory => ({ ...factory, configToParams });
