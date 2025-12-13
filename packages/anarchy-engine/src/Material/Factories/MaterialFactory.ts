import type { TReactiveFactory } from '@Anarchy/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@Anarchy/Engine/Abstract';
import { configToParams } from '@Anarchy/Engine/Material/Adapters';
import type { TAnyMaterialWrapper, TMaterialFactory, TMaterialParams } from '@Anarchy/Engine/Material/Models';
import { MaterialWrapper } from '@Anarchy/Engine/Material/Wrappers';

export function MaterialFactory(): TMaterialFactory {
  const factory: TReactiveFactory<TAnyMaterialWrapper, TMaterialParams> = ReactiveFactory(FactoryType.Material, MaterialWrapper);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
