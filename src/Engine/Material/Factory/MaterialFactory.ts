import type { IReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Material/Adapter';
import type { IMaterialFactory, IMaterialParams, IMaterialWrapper } from '@/Engine/Material/Models';
import { MaterialWrapper } from '@/Engine/Material/Wrapper';

const factory: IReactiveFactory<IMaterialWrapper, IMaterialParams> = { ...ReactiveFactory(FactoryType.Material, MaterialWrapper) };
export const MaterialFactory = (): IMaterialFactory => ({ ...factory, configToParams });
