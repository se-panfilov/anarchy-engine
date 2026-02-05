import type { TReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { FactoryType, ReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { materialConfigToParams } from '@hellpig/anarchy-engine/Material/Adapters';
import type { TAnyMaterialWrapper, TMaterialFactory, TMaterialParams } from '@hellpig/anarchy-engine/Material/Models';
import { MaterialWrapper } from '@hellpig/anarchy-engine/Material/Wrappers';

export function MaterialFactory(): TMaterialFactory {
  const factory: TReactiveFactory<TAnyMaterialWrapper, TMaterialParams> = ReactiveFactory(FactoryType.Material, MaterialWrapper);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams: materialConfigToParams });
}
