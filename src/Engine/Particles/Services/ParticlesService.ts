import type { TMaterialRegistry, TMaterialService } from '@/Engine/Material';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TParticlesConfig, TParticlesFactory, TParticlesParams, TParticlesRegistry, TParticlesService, TParticlesWrapper } from '@/Engine/Particles/Models';
import type { TSceneWrapper } from '@/Engine/Scene';

export function ParticlesService(factory: TParticlesFactory, registry: TParticlesRegistry, materialService: TMaterialService, scene: TSceneWrapper): TParticlesService {
  registry.added$.subscribe((wrapper: TParticlesWrapper): void => scene.addParticles(wrapper));
  factory.entityCreated$.subscribe((wrapper: TParticlesWrapper): void => registry.add(wrapper));
  const materialRegistry: TMaterialRegistry = materialService.getRegistry();

  const create = (params: TParticlesParams): TParticlesWrapper => factory.create(params);
  const createFromConfig = (particles: ReadonlyArray<TParticlesConfig>): ReadonlyArray<TParticlesWrapper> =>
    particles.map((config: TParticlesConfig): TParticlesWrapper => create(factory.configToParams(config, { materialRegistry })));

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
  });

  return {
    create,
    createFromConfig,
    getFactory: (): TParticlesFactory => factory,
    getRegistry: (): TParticlesRegistry => registry,
    getScene: (): TSceneWrapper => scene,
    ...destroyable
  };
}
