import { Vector3 } from 'three';

import type { TParticlesParams, TParticlesTransformAgents } from '@/Engine/Particles/Models';
import type { TConnectedTransformAgent, TDefaultTransformAgent, TTransformAgentParams, TTransformDrive, TTransformDriveParams } from '@/Engine/TransformDrive';
import { ConnectedTransformAgent, DefaultTransformAgent, TransformAgent, TransformDrive } from '@/Engine/TransformDrive';

export function ParticlesTransformDrive(params: TParticlesParams): TTransformDrive {
  const transformAgents: TParticlesTransformAgents = getTransformAgents(params);
  const driveParams: TTransformDriveParams = { activeAgent: params.agent };
  return TransformDrive(driveParams, transformAgents);
}

function getTransformAgents(params: TParticlesParams): TParticlesTransformAgents {
  const agentParams: TTransformAgentParams = { position: params.position, rotation: params.rotation, scale: params.scale ?? new Vector3(1, 1, 1) };
  const connectedTransformAgent: TConnectedTransformAgent = ConnectedTransformAgent(agentParams);
  const defaultTransformAgent: TDefaultTransformAgent = DefaultTransformAgent(agentParams);
  return {
    [TransformAgent.Connected]: connectedTransformAgent,
    [TransformAgent.Default]: defaultTransformAgent
  };
}
