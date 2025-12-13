import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Material/Adapters';
import type { IMaterialFactory, IMaterialParams, IMaterialWrapper } from '@/Engine/Material/Models';
import { MaterialWrapper } from '@/Engine/Material/Wrappers';

const factory: TReactiveFactory<IMaterialWrapper, IMaterialParams> = { ...ReactiveFactory(FactoryType.Material, MaterialWrapper) };
export const MaterialFactory = (): IMaterialFactory => ({ ...factory, configToParams });
