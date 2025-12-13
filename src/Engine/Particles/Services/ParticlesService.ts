import type { TMaterialTextureService } from '@/Engine/MaterialTexturePack';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TParticlesAsyncRegistry, TParticlesConfig, TParticlesFactory, TParticlesParams, TParticlesService, TParticlesWrapperAsync } from '@/Engine/Particles/Models';
import type { TSceneWrapper } from '@/Engine/Scene';

export function ParticlesService(factory: TParticlesFactory, registry: TParticlesAsyncRegistry, materialTextureService: TMaterialTextureService, scene: TSceneWrapper): TParticlesService {
  registry.added$.subscribe((wrapper: TParticlesWrapperAsync): void => scene.addParticles(wrapper));
  factory.entityCreated$.subscribe((wrapper: TParticlesWrapperAsync): void => registry.add(wrapper));

  const createAsync = (params: TParticlesParams): Promise<TParticlesWrapperAsync> => factory.createAsync(params, { materialTextureService });
  const createFromConfig = (particles: ReadonlyArray<TParticlesConfig>): void => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    particles.forEach((config: TParticlesConfig): Promise<TParticlesWrapperAsync> => factory.createAsync(factory.configToParams(config), { materialTextureService }));
  };

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
  });

  return {
    createAsync,
    createFromConfig,
    getFactory: (): TParticlesFactory => factory,
    getRegistry: (): TParticlesAsyncRegistry => registry,
    getScene: (): TSceneWrapper => scene,
    ...destroyable
  };
}
