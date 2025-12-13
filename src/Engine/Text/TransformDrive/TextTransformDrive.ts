import { Vector3 } from 'three';

import { toQuaternion } from '@/Engine/Math';
import type { TTextParams, TTextTransformAgents, TTextTransformDrive, TTextTransformDriveDependencies } from '@/Engine/Text/Models';
import type { TConnectedTransformAgent, TDefaultTransformAgent, TKinematicTransformAgent, TPhysicsTransformAgent, TTransformAgentParams, TTransformDriveParams } from '@/Engine/TransformDrive';
import { ConnectedTransformAgent, DefaultTransformAgent, getKinematicTransformAgent, getPhysicsTransformAgent, TransformAgent, TransformDrive } from '@/Engine/TransformDrive';

export function TextTransformDrive(params: TTextParams, dependencies: TTextTransformDriveDependencies, relatedEntityId: string): TTextTransformDrive {
  const transformAgents: TTextTransformAgents = getTransformAgents(params, dependencies);
  const driveParams: TTransformDriveParams = { activeAgent: params.agent, relatedEntityId };
  return TransformDrive(driveParams, transformAgents);
}

function getTransformAgents(params: TTextParams, { kinematicLoop, physicsBodyService, physicalLoop }: TTextTransformDriveDependencies): TTextTransformAgents {
  //PhysicsTransformAgent might need a special "onDeactivated" hook if it supposed to switch physics/non-physics mode in runtime
  const agentParams: TTransformAgentParams = {
    position: params.position,
    rotation: toQuaternion(params.rotation),
    scale: params.scale ?? new Vector3(1, 1, 1),
    onDeactivated: undefined,
    onActivated: undefined
  };
  const kinematicTransformAgent: TKinematicTransformAgent = getKinematicTransformAgent(agentParams, params.kinematic, { kinematicLoop });
  const physicsTransformAgent: TPhysicsTransformAgent = getPhysicsTransformAgent(agentParams, params.physics, { physicsBodyService, physicalLoop });
  const connectedTransformAgent: TConnectedTransformAgent = ConnectedTransformAgent(agentParams);
  const defaultTransformAgent: TDefaultTransformAgent = DefaultTransformAgent(agentParams);
  return {
    [TransformAgent.Kinematic]: kinematicTransformAgent,
    [TransformAgent.Physical]: physicsTransformAgent,
    [TransformAgent.Connected]: connectedTransformAgent,
    [TransformAgent.Default]: defaultTransformAgent
  };
}
