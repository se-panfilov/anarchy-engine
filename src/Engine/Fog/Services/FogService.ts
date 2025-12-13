import type { IFogFactory, IFogParams, IFogRegistry, IFogService, IFogWrapper } from '@/Engine/Fog/Models';
import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { ISceneWrapper } from '@/Engine/Scene';

export function FogService(factory: IFogFactory, registry: IFogRegistry, scene: ISceneWrapper): IFogService {
  registry.added$.subscribe((fog: IFogWrapper) => scene.setFog(fog));
  factory.entityCreated$.subscribe((fog: IFogWrapper): void => registry.add(fog));

  function createFog(params: IFogParams): IFogWrapper {
    return factory.create(params);
  }

  const destroyable: IDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
  });

  return { createFog, ...destroyable };
}
