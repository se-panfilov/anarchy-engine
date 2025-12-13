import type { Subscription } from 'rxjs';

import type { TAbstractService, TRegistryPack } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TMaterialRegistry, TMaterialService } from '@/Engine/Material';
import type { TDisposable } from '@/Engine/Mixins';
import type { TParticlesConfig, TParticlesFactory, TParticlesParams, TParticlesRegistry, TParticlesService, TParticlesWrapper } from '@/Engine/Particles/Models';
import type { TSceneWrapper } from '@/Engine/Scene';

export function ParticlesService(factory: TParticlesFactory, registry: TParticlesRegistry, materialService: TMaterialService, scene: TSceneWrapper): TParticlesService {
  const registrySub$: Subscription = registry.added$.subscribe(({ value }: TRegistryPack<TParticlesWrapper>): void => scene.addParticles(value));
  const factorySub$: Subscription = factory.entityCreated$.subscribe((wrapper: TParticlesWrapper): void => registry.add(wrapper));
  const materialRegistry: TMaterialRegistry = materialService.getRegistry();

  const disposable: ReadonlyArray<TDisposable> = [registry, factory, registrySub$, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const create = (params: TParticlesParams): TParticlesWrapper => factory.create(params);
  const createFromConfig = (particles: ReadonlyArray<TParticlesConfig>): ReadonlyArray<TParticlesWrapper> =>
    particles.map((config: TParticlesConfig): TParticlesWrapper => create(factory.configToParams(config, { materialRegistry })));

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, {
    create,
    createFromConfig,
    getFactory: (): TParticlesFactory => factory,
    getRegistry: (): TParticlesRegistry => registry,
    getScene: (): TSceneWrapper => scene
  });
}
