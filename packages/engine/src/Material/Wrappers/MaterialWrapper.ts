import { AbstractWrapper, WrapperType } from '@Engine/Abstract';
import { materialToConfig } from '@Engine/Material/Adapters';
import type { TAnyMaterialWrapper, TMaterialConfig, TMaterialEntityToConfigDependencies, TMaterialParams, TMaterials } from '@Engine/Material/Models';
import { buildMaterial } from '@Engine/Material/Utils';

export function MaterialWrapper(params: TMaterialParams): TAnyMaterialWrapper {
  const entity: TMaterials = buildMaterial(params);

  const result: TAnyMaterialWrapper = Object.assign(AbstractWrapper(entity, WrapperType.Material, params), {
    entity,
    serialize: (dependencies: TMaterialEntityToConfigDependencies): TMaterialConfig => materialToConfig(result, dependencies)
  }) as TAnyMaterialWrapper;

  return result;
}
