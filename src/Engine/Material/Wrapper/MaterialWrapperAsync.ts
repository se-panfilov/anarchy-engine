import type { Material } from 'three';

import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { IMaterialParams, IMaterialWrapperAsync } from '@/Engine/Material/Models';

import { buildMaterialWithTextures } from './MaterialUtils';

export async function MaterialWrapperAsync(params: IMaterialParams): Promise<IMaterialWrapperAsync> {
  const entity: Material = await buildMaterialWithTextures(params);

  const result = {
    ...AbstractWrapper(entity, WrapperType.Material, params),
    entity
  };

  return result;
}
