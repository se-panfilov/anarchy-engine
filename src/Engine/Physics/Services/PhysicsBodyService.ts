import type { World } from '@dimforge/rapier3d';

import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type {
  TPhysicsBody,
  TPhysicsBodyFactory,
  TPhysicsBodyParams,
  TPhysicsBodyRegistry,
  TPhysicsBodyService,
  TPhysicsPresetParams,
  TPhysicsPresetsService,
  TPhysicsWorldService,
  TWithPresetNamePhysicsBodyConfig
} from '@/Engine/Physics/Models';
import { getKinematicDataFromPhysics, isPhysicsBodyParamsComplete } from '@/Engine/Physics/Utils';
import type { TOptional } from '@/Engine/Utils';
import { isNotDefined } from '@/Engine/Utils';

export function PhysicsBodyService(
  factory: TPhysicsBodyFactory,
  registry: TPhysicsBodyRegistry,
  physicsPresetService: TPhysicsPresetsService,
  physicsWorldService: TPhysicsWorldService
): TPhysicsBodyService {
  factory.entityCreated$.subscribe((body: TPhysicsBody): void => registry.add(body));

  const create = (params: TPhysicsBodyParams): TPhysicsBody | never => {
    const world: World | undefined = physicsWorldService.getWorld();
    if (isNotDefined(world)) throw new Error('Cannot create physics body: physical world is not defined');
    return factory.create(params, { world });
  };

  const createWithPreset = (params: TOptional<TPhysicsBodyParams>, preset: TPhysicsPresetParams): TPhysicsBody | never => {
    const fullParams: TPhysicsBodyParams | TOptional<TPhysicsBodyParams> = { ...preset, ...params };
    if (!isPhysicsBodyParamsComplete(fullParams)) throw new Error('Cannot create physics body: params are lacking of mandatory fields');

    return create(fullParams);
  };

  const createWithPresetName = (params: TOptional<TPhysicsBodyParams>, presetName: string): TPhysicsBody | never => {
    const preset: TPhysicsPresetParams | undefined = physicsPresetService.getPresetByName(presetName);
    if (isNotDefined(preset)) throw new Error(`Cannot create physics body: preset with name "${presetName}" not found`);
    return createWithPreset(params, preset);
  };

  const createFromConfig = (physics: ReadonlyArray<TWithPresetNamePhysicsBodyConfig>): ReadonlyArray<TPhysicsBody> => {
    return physics.map((config: TWithPresetNamePhysicsBodyConfig): TPhysicsBody => {
      return create(physicsPresetService.getMergedConfigWithPresetParams(config, factory));
    });
  };

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroy$.subscribe((): void => {
    factory.destroy$.next();
    registry.destroy$.next();
  });

  return {
    create,
    createWithPreset,
    createWithPresetName,
    createFromConfig,
    getFactory: (): TPhysicsBodyFactory => factory,
    getRegistry: (): TPhysicsBodyRegistry => registry,
    getKinematicDataFromPhysics,
    ...destroyable
  };
}
