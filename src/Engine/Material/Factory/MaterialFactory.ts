import type { IAsyncReactiveFactory } from '@/Engine/Abstract';
import { AsyncReactiveFactory, FactoryType } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Material/Adapter';
import type { IMaterialFactory, IMaterialParams, IMaterialWrapperAsync } from '@/Engine/Material/Models';
import { MaterialWrapperAsync } from '@/Engine/Material/Wrapper';

const factory: IAsyncReactiveFactory<IMaterialWrapperAsync, IMaterialParams> = { ...AsyncReactiveFactory(FactoryType.Material, MaterialWrapperAsync) };
export const MaterialFactory = (): IMaterialFactory => ({ ...factory, configToParams });
