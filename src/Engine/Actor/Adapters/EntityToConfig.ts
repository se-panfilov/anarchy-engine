import type { TActor, TActorConfig, TActorConfigToParamsDependencies } from '@/Engine/Actor/Models';
import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import { filterOutEmptyFields } from '@/Engine/Utils';

// TODO 15-0-0: (finish 14-0-0 tasks)

// TODO 15-0-0: validate result
export function actorToConfig(entity: TActor, { fsmService, models3dService, spatialGridRegistry }: TActorConfigToParamsDependencies): TActorConfig {
  const { drive } = entity;
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

    ...extractSerializableRegistrableFields(entity),
    ...drive.serialize()
  });
}
