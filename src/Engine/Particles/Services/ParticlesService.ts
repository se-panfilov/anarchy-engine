import type { TMaterialRegistry } from '@/Engine/Material';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TParticlesConfig, TParticlesFactory, TParticlesParams, TParticlesRegistry, TParticlesService, TParticlesWrapper } from '@/Engine/Particles/Models';
import type { TSceneWrapper } from '@/Engine/Scene';

export function ParticlesService(factory: TParticlesFactory, registry: TParticlesRegistry, materialRegistry: TMaterialRegistry, scene: TSceneWrapper): TParticlesService {
  registry.added$.subscribe((wrapper: TParticlesWrapper): void => scene.addParticles(wrapper));
  factory.entityCreated$.subscribe((wrapper: TParticlesWrapper): void => registry.add(wrapper));

  const create = (params: TParticlesParams): TParticlesWrapper => factory.create(params, { materialRegistry });
  const createFromConfig = (particles: ReadonlyArray<TParticlesConfig>): void => {
    particles.forEach((config: TParticlesConfig): TParticlesWrapper => factory.create(factory.configToParams(config), { materialRegistry }));
  };

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
