import type { Subscription } from 'rxjs';

import type { TAbstractService, TRegistryPack } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TMaterialRegistry, TMaterialService } from '@/Engine/Material';
import type { TParticlesConfig, TParticlesFactory, TParticlesParams, TParticlesRegistry, TParticlesService, TParticlesWrapper } from '@/Engine/Particles/Models';
import type { TSceneWrapper } from '@/Engine/Scene';

export function ParticlesService(factory: TParticlesFactory, registry: TParticlesRegistry, materialService: TMaterialService, scene: TSceneWrapper): TParticlesService {
  const abstractService: TAbstractService = AbstractService();
  const registrySub$: Subscription = registry.added$.subscribe(({ value }: TRegistryPack<TParticlesWrapper>): void => scene.addParticles(value));
  const factorySub$: Subscription = factory.entityCreated$.subscribe((wrapper: TParticlesWrapper): void => registry.add(wrapper));
  const materialRegistry: TMaterialRegistry = materialService.getRegistry();

  const create = (params: TParticlesParams): TParticlesWrapper => factory.create(params);
  const createFromConfig = (particles: ReadonlyArray<TParticlesConfig>): ReadonlyArray<TParticlesWrapper> =>
    particles.map((config: TParticlesConfig): TParticlesWrapper => create(factory.configToParams(config, { materialRegistry })));

  const destroySub$: Subscription = abstractService.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    registrySub$.unsubscribe();
    factorySub$.unsubscribe();

    factory.destroy$.next();
    registry.destroy$.next();
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, {
    create,
    createFromConfig,
    getFactory: (): TParticlesFactory => factory,
    getRegistry: (): TParticlesRegistry => registry,
    getScene: (): TSceneWrapper => scene
  });
}
