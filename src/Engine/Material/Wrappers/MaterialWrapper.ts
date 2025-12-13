import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import { materialToConfig } from '@/Engine/Material/Adapters';
import type { TMaterialConfig, TMaterialEntityToConfigDependencies, TMaterialParams, TMaterials, TMaterialWrapper } from '@/Engine/Material/Models';
import { buildMaterial } from '@/Engine/Material/Utils';

export function MaterialWrapper(params: TMaterialParams): TMaterialWrapper {
  const entity: TMaterials = buildMaterial(params);

  const result: TMaterialWrapper = Object.assign(AbstractWrapper(entity, WrapperType.Material, params), {
    entity,
    serialize: (dependencies: TMaterialEntityToConfigDependencies): TMaterialConfig => materialToConfig(result, dependencies)
  }) as TMaterialWrapper;

  return result;
}
