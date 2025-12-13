import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Physics/Adapters';
import type { TPhysicsFactory, TPhysicsParams, TPhysicsWrapper } from '@/Engine/Physics/Models';
import { PhysicsWrapper } from '@/Engine/Physics/Wrappers';

const factory: TReactiveFactory<TPhysicsWrapper, TPhysicsParams> = { ...ReactiveFactory(FactoryType.Physics, PhysicsWrapper) };
export const PhysicsFactory = (): TPhysicsFactory => ({ ...factory, configToParams });
