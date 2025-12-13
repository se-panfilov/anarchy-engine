import { Vector3 } from 'three';

import { metersPerSecond } from '@/Engine/Distance';
import type { TKinematicData, TKinematicParams } from '@/Engine/Kinematic/Models';
import type { TWithPresetNamePhysicsBodyParams } from '@/Engine/Physics';
import { KinematicTransformAgent, PhysicsTransformAgent } from '@/Engine/TransformDrive/Agents';
import type {
  TKinematicAgentDependencies,
  TKinematicTransformAgent,
  TKinematicTransformAgentParams,
  TPhysicsAgentDependencies,
  TPhysicsTransformAgent,
  TPhysicsTransformAgentParams,
  TTransformAgentParams
} from '@/Engine/TransformDrive/Models';
import { omitInObjectWithoutMutation } from '@/Engine/Utils';

export function getKinematicTransformAgent(params: TTransformAgentParams, kinematic: TKinematicParams | undefined, dependencies: TKinematicAgentDependencies): TKinematicTransformAgent {
  const agentParams: TTransformAgentParams = { position: params.position, rotation: params.rotation, scale: params.scale ?? new Vector3(1, 1, 1) };
  const kinematicData: TKinematicData = getKinematicWithDefaults(kinematic);
  const kinematicAgentParams: TKinematicTransformAgentParams = { ...agentParams, ...kinematicData, isAutoUpdate: kinematic?.isAutoUpdate ?? true };
  return KinematicTransformAgent(kinematicAgentParams, dependencies);
}

export function getKinematicWithDefaults(kinematic: TKinematicParams | undefined): TKinematicData {
  return {
    linearSpeed: metersPerSecond(kinematic?.linearSpeed ?? 0),
    linearDirection: kinematic?.linearDirection ?? new Vector3(),
    angularSpeed: metersPerSecond(kinematic?.angularSpeed ?? 0),
    angularDirection: kinematic?.angularDirection ?? new Vector3()
  };
}

export function getPhysicsTransformAgent(params: TTransformAgentParams, physics: TWithPresetNamePhysicsBodyParams | undefined, dependencies: TPhysicsAgentDependencies): TPhysicsTransformAgent {
  const agentParams: TTransformAgentParams = { position: params.position, rotation: params.rotation, scale: params.scale ?? new Vector3(1, 1, 1) };
  const omittedPhysics: Omit<TWithPresetNamePhysicsBodyParams, 'position' | 'rotation'> = omitInObjectWithoutMutation(physics ?? {}, ['position', 'rotation']);
  //We are ignoring physical body's position and rotation, because we are setting them in agentParams (actor)
  const physicalData: TPhysicsTransformAgentParams = { ...omittedPhysics, ...agentParams };
  return PhysicsTransformAgent(physicalData, dependencies);
}
