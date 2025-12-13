import type { TActor, TActorConfig } from '@/Engine/Actor/Models';

// TODO 15-0-0: (finish 14-0-0 tasks)

export function entityToConfig(entity: TActor): TActorConfig {
  // TODO 15-0-0: implement

  return {
    //params
    //driveUpdateDelay?: number;
    //   driveCoordsThreshold?: number;
    //   model3dSettings?: TActorModel3dSettings;
    //   model3dSource: TModel3d;
    //   physics?: TWithPresetNamePhysicsBodyParams;
    //   kinematic?: TOptional<TKinematicParams>;
    //   spatial: TSpatialDataParams;
    //   collisions?: TCollisionsDataParams;
    //   states?: TActorStates;
    // OMIT: 'model3dSettings' | 'model3dSource' | 'physics' | 'kinematic' | 'spatial' | 'collisions' | 'states' | 'position' | 'rotation' | 'scale'
    // name: 'string',
    // model3dSource: 'string'
    // physics?: TWithPresetNamePhysicsBodyConfig,
    // kinematic?: TKinematicConfig,
    // spatial: TSpatialDataConfig,
    // collisions?: TCollisionsDataConfig,
    // model3dSettings?: TActorModel3dSettingsConfig,
    // states?: TActorStatesConfig
    // 'position' | 'rotation' | 'scale'
    // agent?: TransformAgent;
    // tags: [];
  };
}
