import { Quaternion, Vector3 } from 'three';

import { ForwardAxis } from '@/Engine/Kinematic/Constants';
import type { TKinematicData, TKinematicParams } from '@/Engine/Kinematic/Models';
import type { TWithPresetNamePhysicsBodyParams } from '@/Engine/Physics';
import { DEFAULT_RADIUS } from '@/Engine/TransformDrive/Constants';
import { KinematicTransformAgent, PhysicsTransformAgent } from '@/Engine/TransformDrive/Entities/Agents';
import type {
  TKinematicAgentDependencies,
  TKinematicTransformAgent,
  TKinematicTransformAgentParams,
  TPhysicsAgentDependencies,
  TPhysicsTransformAgent,
  TPhysicsTransformAgentParams,
  TTransformAgentParams
} from '@/Engine/TransformDrive/Models';
import type { TOptional } from '@/Engine/Utils';
import { omitInObjectWithoutMutation } from '@/Engine/Utils';

export function getKinematicTransformAgent(params: TTransformAgentParams, kinematic: TOptional<TKinematicParams> | undefined, dependencies: TKinematicAgentDependencies): TKinematicTransformAgent {
  const agentParams: TTransformAgentParams = { position: params.position, rotation: params.rotation, scale: params.scale ?? new Vector3(1, 1, 1) };
  const kinematicData: TKinematicData = getKinematicWithDefaults(kinematic);
  const kinematicAgentParams: TKinematicTransformAgentParams = { ...agentParams, ...kinematicData, isAutoUpdate: kinematic?.isAutoUpdate ?? true };
  return KinematicTransformAgent(kinematicAgentParams, dependencies);
}

export function getKinematicWithDefaults(kinematic: TOptional<TKinematicParams> | undefined): TKinematicData {
  return {
    state: {
      linearSpeed: kinematic?.state?.linearSpeed ?? 0,
      linearDirection: kinematic?.state?.linearDirection ?? new Vector3(),
      angularSpeed: kinematic?.state?.angularSpeed ?? 0,
      angularDirection: kinematic?.state?.angularDirection ?? new Quaternion(),
      radius: kinematic?.state?.radius ?? DEFAULT_RADIUS,
      forwardAxis: ForwardAxis.X,
      isInfiniteRotation: false
    }
  };
}

export function getPhysicsTransformAgent(params: TTransformAgentParams, physics: TWithPresetNamePhysicsBodyParams | undefined, dependencies: TPhysicsAgentDependencies): TPhysicsTransformAgent {
  const agentParams: TTransformAgentParams = { position: params.position, rotation: params.rotation, scale: params.scale ?? new Vector3(1, 1, 1) };
  const omittedPhysics: Omit<TWithPresetNamePhysicsBodyParams, 'position' | 'rotation'> = omitInObjectWithoutMutation(physics ?? {}, ['position', 'rotation']);
  //We are ignoring physical body's position and rotation, because we are setting them in agentParams (actor)
  const physicalData: TPhysicsTransformAgentParams = { ...omittedPhysics, ...agentParams };
  return PhysicsTransformAgent(physicalData, dependencies);
}
