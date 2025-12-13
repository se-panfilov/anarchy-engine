import type { TAudio3dParams, TAudio3dTransformAgents, TAudio3dTransformDrive, TAudioServiceDependencies } from '@Engine/Audio/Models';
import type { TTransformDriveParams } from '@Engine/TransformDrive';

export function Audio3dTransformDrive(params: TAudio3dParams, { transformDriveService }: Pick<TAudioServiceDependencies, 'transformDriveService'>, relatedEntityId: string): TAudio3dTransformDrive {
  const transformAgents: TAudio3dTransformAgents = transformDriveService.getTransformAgents(params, { hasConnected: true }) as TAudio3dTransformAgents;
  const driveParams: TTransformDriveParams = { activeAgent: params.agent, relatedEntityId };

  return transformDriveService.create(driveParams, transformAgents) as TAudio3dTransformDrive;
}
