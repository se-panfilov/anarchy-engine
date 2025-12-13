import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Material/Adapters';
import type { TAnyMaterialWrapper, TMaterialFactory, TMaterialParams } from '@/Engine/Material/Models';
import { MaterialWrapper } from '@/Engine/Material/Wrappers';

export function MaterialFactory(): TMaterialFactory {
  const factory: TReactiveFactory<TAnyMaterialWrapper, TMaterialParams> = ReactiveFactory(FactoryType.Material, MaterialWrapper);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
