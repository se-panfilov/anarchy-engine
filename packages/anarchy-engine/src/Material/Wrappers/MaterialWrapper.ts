import { AbstractWrapper, WrapperType } from '@hellpig/anarchy-engine/Abstract';
import { materialEntityToConfig } from '@hellpig/anarchy-engine/Material/Adapters';
import type { TAnyMaterialWrapper, TMaterialConfig, TMaterialEntityToConfigDependencies, TMaterialParams, TMaterials } from '@hellpig/anarchy-engine/Material/Models';
import { buildMaterial } from '@hellpig/anarchy-engine/Material/Utils';

export function MaterialWrapper(params: TMaterialParams): TAnyMaterialWrapper {
  const entity: TMaterials = buildMaterial(params);

  const result: TAnyMaterialWrapper = Object.assign(AbstractWrapper(entity, WrapperType.Material, params), {
    entity,
    serialize: (dependencies: TMaterialEntityToConfigDependencies): TMaterialConfig => materialEntityToConfig(result, dependencies)
  }) as TAnyMaterialWrapper;

  return result;
}
