import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParamsPreset } from '@/Engine/Physics/Adapters';
import type { TPhysicsPresetFactory, TPhysicsPresetParams, TPhysicsPresetParams } from '@/Engine/Physics/Models';

const factory: TReactiveFactory<TPhysicsPresetParams, TPhysicsPresetParams> = { ...ReactiveFactory(FactoryType.PhysicsPreset, PhysicsPreset) };
export const PhysicsPresetFactory = (): TPhysicsPresetFactory => ({ ...factory, configToParams: configToParamsPreset });
