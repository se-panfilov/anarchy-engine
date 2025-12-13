import { Quaternion, Vector3 } from 'three';

import type { TKinematicData, TKinematicParams } from '@/Engine/Kinematic';
import { DEFAULT_RADIUS, ForwardAxis } from '@/Engine/Kinematic';
import type { TPhysicsBody } from '@/Engine/Physics';
import { KinematicTransformAgent, PhysicsTransformAgent } from '@/Engine/TransformDrive/Entities/Agents';
import type {
  TKinematicAgentDependencies,
  TKinematicTransformAgent,
  TKinematicTransformAgentParams,
  TPhysicsAgentDependencies,
  TPhysicsTransformAgent,
  TTransformAgentParams
} from '@/Engine/TransformDrive/Models';
import type { TOptional } from '@/Engine/Utils';

export function getKinematicTransformAgent(params: TTransformAgentParams, kinematic: TOptional<TKinematicParams> | undefined, dependencies: TKinematicAgentDependencies): TKinematicTransformAgent {
  const agentParams: TTransformAgentParams = { position: params.position, rotation: params.rotation, scale: params.scale ?? new Vector3(1, 1, 1) };
  const kinematicData: TKinematicData = getKinematicWithDefaults(kinematic);
  const kinematicAgentParams: TKinematicTransformAgentParams = { ...agentParams, ...kinematicData, isAutoUpdate: kinematic?.isAutoUpdate ?? true };
  return KinematicTransformAgent(kinematicAgentParams, dependencies);
}

export function getKinematicWithDefaults(kinematic: TOptional<TKinematicParams> | undefined): TKinematicData {
  const state = kinematic?.state ?? {};
  const target = kinematic?.target ?? {};
  const { linearSpeed, linearDirection, angularDirection, angularSpeed, radius } = state;
  const { position, rotation, positionThreshold, rotationThreshold } = target;

  return {
    state: {
      linearSpeed: linearSpeed ?? 0,
      linearDirection: linearDirection ?? new Vector3(),
      angularSpeed: angularSpeed ?? 0,
      angularDirection: angularDirection ?? new Quaternion(),
      radius: radius ?? DEFAULT_RADIUS,
      forwardAxis: ForwardAxis.X,
      isInfiniteRotation: false
    },
    target: {
      positionThreshold: positionThreshold ?? 0.01,
      position,
      rotationThreshold: rotationThreshold ?? 0.0001,
      rotation
    }
  };
}

// TODO 15-0-0: Do we need this function?
export function getPhysicsTransformAgent(params: TTransformAgentParams, physicBody: TPhysicsBody, dependencies: TPhysicsAgentDependencies): TPhysicsTransformAgent {
  // const agentParams: TTransformAgentParams = { position: params.position, rotation: params.rotation, scale: params.scale ?? new Vector3(1, 1, 1) };
  // const omittedPhysics: Omit<TPhysicsBody, 'position' | 'rotation'> = omitInObjectWithoutMutation(physicBody ?? ({} as TPhysicsBody), ['position', 'rotation']);
  //We are ignoring physical body's position and rotation, because we are setting them in agentParams (actor)
  // const physicalData: TPhysicsTransformAgentParams = { ...omittedPhysics, ...agentParams };
  return PhysicsTransformAgent({ ...params, physicBody }, dependencies);
}
