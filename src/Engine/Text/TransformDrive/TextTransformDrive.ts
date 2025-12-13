import { Vector3 } from 'three';

import type { TTextParams, TTextTransformAgents, TTextTransformDrive, TTextTransformDriveDependencies } from '@/Engine/Text/Models';
import type { TConnectedTransformAgent, TDefaultTransformAgent, TKinematicTransformAgent, TPhysicsTransformAgent, TTransformAgentParams, TTransformDriveParams } from '@/Engine/TransformDrive';
import { ConnectedTransformAgent, DefaultTransformAgent, getKinematicTransformAgent, getPhysicsTransformAgent, TransformAgent, TransformDrive } from '@/Engine/TransformDrive';

export function TextTransformDrive(params: TTextParams, dependencies: TTextTransformDriveDependencies): TTextTransformDrive {
  const transformAgents: TTextTransformAgents = getTransformAgents(params, dependencies);
  const driveParams: TTransformDriveParams = { activeAgent: params.agent };
  return TransformDrive(driveParams, transformAgents);
}

function getTransformAgents(params: TTextParams, { kinematicLoopService, physicsBodyService, physicsLoopService }: TTextTransformDriveDependencies): TTextTransformAgents {
  const agentParams: TTransformAgentParams = { position: params.position, rotation: params.rotation, scale: params.scale ?? new Vector3(1, 1, 1) };
  const kinematicTransformAgent: TKinematicTransformAgent = getKinematicTransformAgent(agentParams, params.kinematic, { kinematicLoopService });
  const physicsTransformAgent: TPhysicsTransformAgent = getPhysicsTransformAgent(agentParams, params.physics, { physicsBodyService, physicsLoopService });
  const connectedTransformAgent: TConnectedTransformAgent = ConnectedTransformAgent(agentParams);
  const defaultTransformAgent: TDefaultTransformAgent = DefaultTransformAgent(agentParams);
  return {
    [TransformAgent.Kinematic]: kinematicTransformAgent,
    [TransformAgent.Physical]: physicsTransformAgent,
    [TransformAgent.Connected]: connectedTransformAgent,
    [TransformAgent.Default]: defaultTransformAgent
  };
}
