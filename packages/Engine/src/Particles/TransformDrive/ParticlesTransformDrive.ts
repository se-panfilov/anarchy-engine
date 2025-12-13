import type { TParticlesParams, TParticlesServiceDependencies, TParticlesTransformAgents, TParticlesTransformDrive } from '@/Engine/Particles/Models';
import type { TTransformDriveParams } from '@/Engine/TransformDrive';

export function ParticlesTransformDrive(
  params: TParticlesParams,
  { transformDriveService }: Pick<TParticlesServiceDependencies, 'transformDriveService'>,
  relatedEntityId: string
): TParticlesTransformDrive {
  const transformAgents: TParticlesTransformAgents = transformDriveService.getTransformAgents(params, { hasConnected: true }) as TParticlesTransformAgents;
  const driveParams: TTransformDriveParams = { activeAgent: params.agent, relatedEntityId };

  return transformDriveService.create(driveParams, transformAgents) as TParticlesTransformDrive;
}
