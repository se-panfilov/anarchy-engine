import { Vector3 } from 'three';

import type { TKinematicData, TKinematicDataParams } from '@/Engine/Kinematic/Models';
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

export function getKinematicTransformAgent(params: TTransformAgentParams, kinematic: TKinematicDataParams | undefined, dependencies: TKinematicAgentDependencies): TKinematicTransformAgent {
  const agentParams: TTransformAgentParams = { position: params.position, rotation: params.rotation, scale: params.scale ?? new Vector3(1, 1, 1) };
  const kinematicData: TKinematicData = getKinematicWithDefaults(kinematic);
  const kinematicAgentParams: TKinematicTransformAgentParams = { ...agentParams, ...kinematicData, isAutoUpdate: kinematic?.isAutoUpdate ?? true };
  return KinematicTransformAgent(kinematicAgentParams, dependencies);
}

export function getKinematicWithDefaults(kinematic: TKinematicDataParams | undefined): TKinematicData {
  return {
    linearSpeed: kinematic?.linearSpeed ?? 0,
    linearDirection: kinematic?.linearDirection ?? new Vector3(),
    angularSpeed: kinematic?.angularSpeed ?? 0,
    angularDirection: kinematic?.angularDirection ?? new Vector3()
  };
}

export function getPhysicsTransformAgent(params: TTransformAgentParams, physics: TWithPresetNamePhysicsBodyParams | undefined, dependencies: TPhysicsAgentDependencies): TPhysicsTransformAgent {
  const agentParams: TTransformAgentParams = { position: params.position, rotation: params.rotation, scale: params.scale ?? new Vector3(1, 1, 1) };
  const physicalData: TPhysicsTransformAgentParams = { ...agentParams, ...physics };
  return PhysicsTransformAgent(physicalData, dependencies);
}
