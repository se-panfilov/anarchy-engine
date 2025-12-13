import { Quaternion, Vector3 } from 'three';

import type { TAudio3dParams, TAudio3dTransformAgents, TAudio3dTransformDrive } from '@/Engine/Audio/Models';
import type { TConnectedTransformAgent, TDefaultTransformAgent, TTransformAgentParams, TTransformDriveParams } from '@/Engine/TransformDrive';
import { ConnectedTransformAgent, DefaultTransformAgent, TransformAgent, TransformDrive } from '@/Engine/TransformDrive';

export function Audio3dTransformDrive(params: TAudio3dParams, relatedEntityId: string): TAudio3dTransformDrive {
  const transformAgents: TAudio3dTransformAgents = getTransformAgents(params);
  const driveParams: TTransformDriveParams = { activeAgent: params.agent, relatedEntityId };
  return TransformDrive(driveParams, transformAgents);
}

function getTransformAgents(params: TAudio3dParams): TAudio3dTransformAgents {
  const agentParams: TTransformAgentParams = {
    position: params.position,
    rotation: new Quaternion(),
    scale: new Vector3(1, 1, 1),
    onDeactivated: undefined,
    onActivated: undefined
  };
  const connectedTransformAgent: TConnectedTransformAgent = ConnectedTransformAgent(agentParams);
  const defaultTransformAgent: TDefaultTransformAgent = DefaultTransformAgent(agentParams);
  return {
    [TransformAgent.Connected]: connectedTransformAgent,
    [TransformAgent.Default]: defaultTransformAgent
  };
}
