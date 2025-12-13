import type { TActor, TActorConfig } from '@/Engine/Actor/Models';
import { extractRegistrableFields } from '@/Engine/Mixins';
import { filterOutEmptyFields } from '@/Engine/Utils';

// TODO 15-0-0: (finish 14-0-0 tasks)

export function actorToConfig(entity: TActor): TActorConfig {
  const { tags, drive } = entity;
  // TODO 15-0-0: implement

  return filterOutEmptyFields({
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

    ...extractRegistrableFields(entity),
    ...drive.serialize(),
    tags
    // TODO 15-0-0: fix any
  }) as any;
}
