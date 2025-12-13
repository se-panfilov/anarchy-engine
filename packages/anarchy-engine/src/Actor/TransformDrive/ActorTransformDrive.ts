import type { TActorDependencies, TActorParams, TActorTransformAgents, TActorTransformDrive } from '@Anarchy/Engine/Actor/Models';
import type { TTransformDriveParams } from '@Anarchy/Engine/TransformDrive';

export function ActorTransformDrive(params: TActorParams, { transformDriveService }: Pick<TActorDependencies, 'transformDriveService'>, relatedEntityId: string): TActorTransformDrive {
  const transformAgents: TActorTransformAgents = transformDriveService.getTransformAgents(params, {
    hasKinematic: true,
    hasPhysics: true,
    hasConnected: true
  }) as TActorTransformAgents;
  const driveParams: TTransformDriveParams = { activeAgent: params.agent, relatedEntityId };

  return transformDriveService.create(driveParams, transformAgents) as TActorTransformDrive;
}
