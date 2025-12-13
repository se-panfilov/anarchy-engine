import { Vector3 } from 'three';

import type { TActorParams, TActorTransformAgents, TActorTransformDrive } from '@/Engine/Actor/Models';
import type { TKinematicLoopService } from '@/Engine/Kinematic';
import type { TConnectedTransformAgent, TDefaultTransformAgent, TKinematicTransformAgent, TPhysicsTransformAgent, TTransformAgentParams, TTransformDriveParams } from '@/Engine/TransformDrive';
import { ConnectedTransformAgent, DefaultTransformAgent, getKinematicTransformAgent, PhysicsTransformAgent, TransformAgent, TransformDrive } from '@/Engine/TransformDrive';

export function ActorTransformDrive(params: TActorParams, kinematicLoopService: TKinematicLoopService): TActorTransformDrive {
  const transformAgents: TActorTransformAgents = getTransformAgents(params, kinematicLoopService);
  const driveParams: TTransformDriveParams = { activeAgent: params.agent };
  return TransformDrive(driveParams, transformAgents);
}

function getTransformAgents(params: TActorParams, kinematicLoopService: TKinematicLoopService): TActorTransformAgents {
  const agentParams: TTransformAgentParams = { position: params.position, rotation: params.rotation, scale: params.scale ?? new Vector3(1, 1, 1) };
  const kinematicTransformAgent: TKinematicTransformAgent = getKinematicTransformAgent(agentParams, params.kinematic, kinematicLoopService);
  const physicsTransformAgent: TPhysicsTransformAgent = PhysicsTransformAgent(agentParams);
  const connectedTransformAgent: TConnectedTransformAgent = ConnectedTransformAgent(agentParams);
  const defaultTransformAgent: TDefaultTransformAgent = DefaultTransformAgent(agentParams);
  return {
    [TransformAgent.Kinematic]: kinematicTransformAgent,
    [TransformAgent.Physical]: physicsTransformAgent,
    [TransformAgent.Connected]: connectedTransformAgent,
    [TransformAgent.Default]: defaultTransformAgent
  };
}
