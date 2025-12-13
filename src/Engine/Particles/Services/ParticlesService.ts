import type { TMaterialTextureService } from '@/Engine/MaterialTexturePack';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { IParticlesAsyncRegistry, IParticlesConfig, IParticlesFactory, IParticlesParams, IParticlesService, TParticlesWrapperAsync } from '@/Engine/Particles/Models';
import type { TSceneWrapper } from '@/Engine/Scene';

export function ParticlesService(factory: IParticlesFactory, registry: IParticlesAsyncRegistry, materialTextureService: TMaterialTextureService, scene: TSceneWrapper): IParticlesService {
  registry.added$.subscribe((wrapper: TParticlesWrapperAsync): void => scene.addParticles(wrapper));
  factory.entityCreated$.subscribe((wrapper: TParticlesWrapperAsync): void => registry.add(wrapper));

  const createAsync = (params: IParticlesParams): Promise<TParticlesWrapperAsync> => factory.createAsync(params, { materialTextureService });
  const createFromConfig = (particles: ReadonlyArray<IParticlesConfig>): void => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    particles.forEach((config: IParticlesConfig): Promise<TParticlesWrapperAsync> => factory.createAsync(factory.configToParams(config), { materialTextureService }));
  };

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
  });

  return {
    createAsync,
    createFromConfig,
    getFactory: (): IParticlesFactory => factory,
    getRegistry: (): IParticlesAsyncRegistry => registry,
    getScene: (): TSceneWrapper => scene,
    ...destroyable
  };
}
