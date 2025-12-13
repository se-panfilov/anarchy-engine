import type { IReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from 'src/Engine/Material/Adapters';
import type { IMaterialFactory, IMaterialParams, IMaterialWrapper } from '@/Engine/Material/Models';
import { MaterialWrapper } from 'src/Engine/Material/Wrappers';

const factory: IReactiveFactory<IMaterialWrapper, IMaterialParams> = { ...ReactiveFactory(FactoryType.Material, MaterialWrapper) };
export const MaterialFactory = (): IMaterialFactory => ({ ...factory, configToParams });
