import { Vector3 } from 'three';

import type { TLightParams, TLightTransformAgents, TLightTransformDrive } from '@/Engine/Light/Models';
import type { TConnectedTransformAgent, TDefaultTransformAgent, TTransformAgentParams, TTransformDriveParams } from '@/Engine/TransformDrive';
import { ConnectedTransformAgent, DefaultTransformAgent, TransformAgent, TransformDrive } from '@/Engine/TransformDrive';

export function LightTransformDrive(params: TLightParams): TLightTransformDrive {
  const transformAgents: TLightTransformAgents = getTransformAgents(params);
  const driveParams: TTransformDriveParams = { activeAgent: params.agent };
  return TransformDrive(driveParams, transformAgents);
}

function getTransformAgents(params: TLightParams): TLightTransformAgents {
  const agentParams: TTransformAgentParams = { position: params.position, rotation: params.rotation, scale: params.scale ?? new Vector3(1, 1, 1) };
  const connectedTransformAgent: TConnectedTransformAgent = ConnectedTransformAgent(agentParams);
  const defaultTransformAgent: TDefaultTransformAgent = DefaultTransformAgent(agentParams);
  return {
    [TransformAgent.Connected]: connectedTransformAgent,
    [TransformAgent.Default]: defaultTransformAgent
  };
}
