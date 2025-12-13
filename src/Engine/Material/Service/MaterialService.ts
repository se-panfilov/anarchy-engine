import type { IMaterialAsyncRegistry, IMaterialConfig, IMaterialFactory, IMaterialParams, IMaterialService, IMaterialWrapperAsync } from '@/Engine/Material/Models';
import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';

export function MaterialService(factory: IMaterialFactory, registry: IMaterialAsyncRegistry): IMaterialService {
  factory.entityCreated$.subscribe((wrapper: IMaterialWrapperAsync): void => registry.add(wrapper));

  const createAsync = (params: IMaterialParams): Promise<IMaterialWrapperAsync> => factory.createAsync(params);
  const createFromConfig = (material: ReadonlyArray<IMaterialConfig>): void => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    material.forEach((config: IMaterialConfig): Promise<IMaterialWrapperAsync> => factory.createAsync(factory.configToParams(config)));
  };

  const destroyable: IDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
  });

  return {
    createAsync,
    createFromConfig,
    getFactory: (): IMaterialFactory => factory,
    getRegistry: (): IMaterialAsyncRegistry => registry,
    ...destroyable
  };
}
