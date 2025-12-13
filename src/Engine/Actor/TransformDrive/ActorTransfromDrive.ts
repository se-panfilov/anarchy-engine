import { Vector3 } from 'three';

import type { TActorParams } from '@/Engine/Actor/Models';
import type { TKinematicLoopService } from '@/Engine/Kinematic';
import type {
  TInstantTransformAgent,
  TKinematicTransformAgent,
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
  const agentParams: TTransformAgentParams = { position: params.position, rotation: params.rotation, scale: params.scale ?? new Vector3(1, 1, 1) };
  const driveParams: TTransformDriveParams = { activeAgent: params.agent ?? TransformAgent.Instant };
  const kinematicTransformAgent: TKinematicTransformAgent = KinematicTransformAgent(agentParams, kinematicLoopService);
  const physicsTransformAgent: TPhysicsTransformAgent = PhysicsTransformAgent(agentParams);
  const instantTransformAgent: TInstantTransformAgent = InstantTransformAgent(agentParams);
  const transformAgents: TTransformAgents = { [TransformAgent.Kinematic]: kinematicTransformAgent, [TransformAgent.Physical]: physicsTransformAgent, [TransformAgent.Instant]: instantTransformAgent };
  return TransformDrive(driveParams, transformAgents);
}
