import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Fog/Adapters';
import type { TFogFactory, TFogParams, TFogWrapper } from '@/Engine/Fog/Models';
import { FogWrapper } from '@/Engine/Fog/Wrappers';

const factory: TReactiveFactory<TFogWrapper, TFogParams> = ReactiveFactory(FactoryType.Fog, FogWrapper);
// eslint-disable-next-line functional/immutable-data
export const FogFactory = (): TFogFactory => Object.assign(factory, { configToParams });
