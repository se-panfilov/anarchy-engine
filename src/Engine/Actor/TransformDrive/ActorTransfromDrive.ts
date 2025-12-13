import { Vector3 } from 'three';

import type { TActorParams } from '@/Engine/Actor/Models';
import type { TKinematicData, TKinematicDataParams, TKinematicLoopService } from '@/Engine/Kinematic';
import type {
  TInstantTransformAgent,
  TKinematicTransformAgent,
  TKinematicTransformAgentParams,
  TPhysicsTransformAgent,
  TTransformAgentParams,
  TTransformAgents,
  TTransformDrive,
  TTransformDriveParams
} from '@/Engine/TransformDrive';
import { TransformAgent, TransformDrive } from '@/Engine/TransformDrive';
import { InstantTransformAgent } from '@/Engine/TransformDrive/Agents/InstantTransformAgent';
import { KinematicTransformAgent } from '@/Engine/TransformDrive/Agents/KinematicTransformAgent';
import { PhysicsTransformAgent } from '@/Engine/TransformDrive/Agents/PhysicsTransformAgent';

export function ActorTransformDrive(params: TActorParams, kinematicLoopService: TKinematicLoopService): TTransformDrive {
  const transformAgents: TTransformAgents = getTransformAgents(params, kinematicLoopService);
  const driveParams: TTransformDriveParams = { activeAgent: params.agent ?? TransformAgent.Instant };
  return TransformDrive(driveParams, transformAgents);
}

function getTransformAgents(params: TActorParams, kinematicLoopService: TKinematicLoopService): TTransformAgents {
  const agentParams: TTransformAgentParams = { position: params.position, rotation: params.rotation, scale: params.scale ?? new Vector3(1, 1, 1) };
  const kinematicTransformAgent: TKinematicTransformAgent = getKinematicTransformAgent(agentParams, params.kinematic, kinematicLoopService);
  const physicsTransformAgent: TPhysicsTransformAgent = PhysicsTransformAgent(agentParams);
  const instantTransformAgent: TInstantTransformAgent = InstantTransformAgent(agentParams);
  return { [TransformAgent.Kinematic]: kinematicTransformAgent, [TransformAgent.Physical]: physicsTransformAgent, [TransformAgent.Instant]: instantTransformAgent };
}

function getKinematicTransformAgent(params: TTransformAgentParams, kinematic: TKinematicDataParams | undefined, kinematicLoopService: TKinematicLoopService): TKinematicTransformAgent {
  const agentParams: TTransformAgentParams = { position: params.position, rotation: params.rotation, scale: params.scale ?? new Vector3(1, 1, 1) };
  const kinematicData: TKinematicData = getKinematicWithDefaults(kinematic);
  const kinematicAgentParams: TKinematicTransformAgentParams = { ...agentParams, ...kinematicData, isAutoUpdate: kinematic?.isAutoUpdate ?? true };
  return KinematicTransformAgent(kinematicAgentParams, kinematicLoopService);
}

function getKinematicWithDefaults(kinematic: TKinematicDataParams | undefined): TKinematicData {
  return {
    linearSpeed: kinematic?.linearSpeed ?? 0,
    linearDirection: kinematic?.linearDirection ?? new Vector3(),
    angularSpeed: kinematic?.angularSpeed ?? 0,
    angularDirection: kinematic?.angularDirection ?? new Vector3()
  };
}
