import type { TActor, TActorConfig } from '@/Engine/Actor/Models';

// TODO 15-0-0: (finish 14-0-0 tasks)

export function entityToConfig(entity: TActor): TActorConfig {
  const { name, tags, drive } = entity;
  // TODO 15-0-0: implement

  return {
    name,

    // driveUpdateDelay //needs a getter (maybe at TransformDrive)
    //   driveCoordsThreshold?: number;  //needs a getter (maybe at TransformDrive)

    //   model3dSettings?: TActorModel3dSettings;

    // model3dSource: 'string'
    // physics?: TWithPresetNamePhysicsBodyConfig,
    // kinematic?: TKinematicConfig,
    // spatial: TSpatialDataConfig,
    // collisions?: TCollisionsDataConfig,
    // model3dSettings?: TActorModel3dSettingsConfig,

    // states?: TActorStatesConfig //Can we have a generic serialization for FSM?

    ...drive.serialize(),
    tags
    // TODO 15-0-0: fix any
  } as any;
}
