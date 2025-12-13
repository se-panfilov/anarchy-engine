import type { IAbstractLightWrapper, ILight, ILightConfig, ILightFactory, ILightParams, ILightRegistry, ILightService } from '@/Engine/Light/Models';
import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { ISceneWrapper } from '@/Engine/Scene';

export function LightService(factory: ILightFactory, registry: ILightRegistry, scene: ISceneWrapper): ILightService {
  registry.added$.subscribe((wrapper: IAbstractLightWrapper<ILight>) => scene.addLight(wrapper));
  factory.entityCreated$.subscribe((wrapper: IAbstractLightWrapper<ILight>): void => registry.add(wrapper));

  const create = (params: ILightParams): IAbstractLightWrapper<ILight> => factory.create(params);
  const createFromConfig = (lights: ReadonlyArray<ILightConfig>): void => lights.forEach((config: ILightConfig): IAbstractLightWrapper<ILight> => factory.create(factory.configToParams(config)));

  const destroyable: IDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
  });

  return {
    create,
    createFromConfig,
    getFactory: (): ILightFactory => factory,
    getRegistry: (): ILightRegistry => registry,
    getScene: (): ISceneWrapper => scene,
    ...destroyable
  };
}
