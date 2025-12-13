import { Vector3 } from 'three';

import type { TKinematicData, TKinematicDataParams, TKinematicLoopService } from '@/Engine/Kinematic/Models';
import { KinematicTransformAgent } from '@/Engine/TransformDrive/Agents';
import type { TKinematicTransformAgent, TKinematicTransformAgentParams, TTransformAgentParams } from '@/Engine/TransformDrive/Models';

export function getKinematicTransformAgent(params: TTransformAgentParams, kinematic: TKinematicDataParams | undefined, kinematicLoopService: TKinematicLoopService): TKinematicTransformAgent {
  const agentParams: TTransformAgentParams = { position: params.position, rotation: params.rotation, scale: params.scale ?? new Vector3(1, 1, 1) };
  const kinematicData: TKinematicData = getKinematicWithDefaults(kinematic);
  const kinematicAgentParams: TKinematicTransformAgentParams = { ...agentParams, ...kinematicData, isAutoUpdate: kinematic?.isAutoUpdate ?? true };
  return KinematicTransformAgent(kinematicAgentParams, kinematicLoopService);
}

export function getKinematicWithDefaults(kinematic: TKinematicDataParams | undefined): TKinematicData {
  return {
    linearSpeed: kinematic?.linearSpeed ?? 0,
    linearDirection: kinematic?.linearDirection ?? new Vector3(),
    angularSpeed: kinematic?.angularSpeed ?? 0,
    angularDirection: kinematic?.angularDirection ?? new Vector3()
  };
}
