import { Vector3 } from 'three';

import type { TCameraParams, TCameraTransformAgents, TCameraTransformDrive } from '@/Engine/Camera/Models';
import type { TConnectedTransformAgent, TDefaultTransformAgent, TTransformAgentParams, TTransformDriveParams } from '@/Engine/TransformDrive';
import { ConnectedTransformAgent, DefaultTransformAgent, TransformAgent, TransformDrive } from '@/Engine/TransformDrive';

export function CameraTransformDrive(params: TCameraParams): TCameraTransformDrive {
  const transformAgents: TCameraTransformAgents = getTransformAgents(params);
  const driveParams: TTransformDriveParams = { activeAgent: params.agent };
  return TransformDrive(driveParams, transformAgents);
}

function getTransformAgents(params: TCameraParams): TCameraTransformAgents {
  const agentParams: TTransformAgentParams = { position: params.position, rotation: params.rotation, scale: params.scale ?? new Vector3(1, 1, 1) };
  const connectedTransformAgent: TConnectedTransformAgent = ConnectedTransformAgent(agentParams);
  const defaultTransformAgent: TDefaultTransformAgent = DefaultTransformAgent(agentParams);
  return {
    [TransformAgent.Connected]: connectedTransformAgent,
    [TransformAgent.Default]: defaultTransformAgent
  };
}
