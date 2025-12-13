import { Vector3 } from 'three';

import { toQuaternion } from '@/Engine/Math';
import type { TParticlesParams, TParticlesTransformAgents, TParticlesTransformDrive } from '@/Engine/Particles/Models';
import type { TConnectedTransformAgent, TDefaultTransformAgent, TTransformAgentParams, TTransformDriveParams } from '@/Engine/TransformDrive';
import { ConnectedTransformAgent, DefaultTransformAgent, TransformAgent, TransformDrive } from '@/Engine/TransformDrive';

export function ParticlesTransformDrive(params: TParticlesParams, relatedEntityId: string): TParticlesTransformDrive {
  const transformAgents: TParticlesTransformAgents = getTransformAgents(params);
  const driveParams: TTransformDriveParams = { activeAgent: params.agent, relatedEntityId };
  return TransformDrive(driveParams, transformAgents);
}

function getTransformAgents(params: TParticlesParams): TParticlesTransformAgents {
  const agentParams: TTransformAgentParams = {
    position: params.position,
    rotation: toQuaternion(params.rotation),
    scale: params.scale ?? new Vector3(1, 1, 1),
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
