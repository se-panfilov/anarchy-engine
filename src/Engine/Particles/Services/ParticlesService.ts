import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { IParticlesConfig, IParticlesFactory, IParticlesParams, IParticlesRegistry, IParticlesService, IParticlesWrapper } from '@/Engine/Particles/Models';
import type { ISceneWrapper } from '@/Engine/Scene';

export function ParticlesService(factory: IParticlesFactory, registry: IParticlesRegistry, scene: ISceneWrapper): IParticlesService {
  registry.added$.subscribe((particles: IParticlesWrapper) => scene.setParticles(particles));
  factory.entityCreated$.subscribe((particles: IParticlesWrapper): void => registry.add(particles));

  const create = (params: IParticlesParams): IParticlesWrapper => factory.create(params);
  const createFromConfig = (particless: ReadonlyArray<IParticlesConfig>): void =>
    particless.forEach((particles: IParticlesConfig): IParticlesWrapper => factory.create(factory.configToParams(particles)));

  const destroyable: IDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
  });

  return {
    create,
    createFromConfig,
    getFactory: (): IParticlesFactory => factory,
    getRegistry: (): IParticlesRegistry => registry,
    getScene: (): ISceneWrapper => scene,
    ...destroyable
  };
}
