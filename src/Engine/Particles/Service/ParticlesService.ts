import type { IMaterialTextureService } from '@/Engine/MaterialTexturePack';
import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { IParticlesAsyncRegistry, IParticlesConfig, IParticlesFactory, IParticlesParams, IParticlesService, IParticlesWrapperAsync } from '@/Engine/Particles/Models';
import type { ISceneWrapper } from '@/Engine/Scene';

export function ParticlesService(factory: IParticlesFactory, registry: IParticlesAsyncRegistry, materialTextureService: IMaterialTextureService, scene: ISceneWrapper): IParticlesService {
  registry.added$.subscribe((wrapper: IParticlesWrapperAsync): void => scene.addParticles(wrapper));
  factory.entityCreated$.subscribe((wrapper: IParticlesWrapperAsync): void => registry.add(wrapper));

  const createAsync = (params: IParticlesParams): Promise<IParticlesWrapperAsync> => factory.createAsync(params, { materialTextureService });
  const createFromConfig = (particles: ReadonlyArray<IParticlesConfig>): void => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    particles.forEach((config: IParticlesConfig): Promise<IParticlesWrapperAsync> => factory.createAsync(factory.configToParams(config), { materialTextureService }));
  };

  const destroyable: IDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
  });

  return {
    createAsync,
    createFromConfig,
    getFactory: (): IParticlesFactory => factory,
    getRegistry: (): IParticlesAsyncRegistry => registry,
    getScene: (): ISceneWrapper => scene,
    ...destroyable
  };
}
