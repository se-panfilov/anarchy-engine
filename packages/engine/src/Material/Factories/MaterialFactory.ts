import type { TReactiveFactory } from '@/Abstract';
import { FactoryType, ReactiveFactory } from '@/Abstract';
import { configToParams } from '@/Material/Adapters';
import type { TAnyMaterialWrapper, TMaterialFactory, TMaterialParams } from '@/Material/Models';
import { MaterialWrapper } from '@/Material/Wrappers';

export function MaterialFactory(): TMaterialFactory {
  const factory: TReactiveFactory<TAnyMaterialWrapper, TMaterialParams> = ReactiveFactory(FactoryType.Material, MaterialWrapper);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
