import type { IFogConfig, IFogFactory, IFogParams, IFogRegistry, IFogService, IFogWrapper } from '@/Engine/Fog/Models';
import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { ISceneWrapper } from '@/Engine/Scene';

export function FogService(factory: IFogFactory, registry: IFogRegistry, scene: ISceneWrapper): IFogService {
  registry.added$.subscribe((fog: IFogWrapper) => scene.setFog(fog));
  factory.entityCreated$.subscribe((fog: IFogWrapper): void => registry.add(fog));

  const create = (params: IFogParams): IFogWrapper => factory.create(params);
  const createFromConfig = (fogs: ReadonlyArray<IFogConfig>): void => fogs.forEach((fog: IFogConfig): IFogWrapper => factory.create(factory.configToParams(fog)));

  const destroyable: IDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
  });

  return {
    create,
    createFromConfig,
    getFactory: (): IFogFactory => factory,
    getRegistry: (): IFogRegistry => registry,
    getScene: (): ISceneWrapper => scene,
    ...destroyable
  };
}
