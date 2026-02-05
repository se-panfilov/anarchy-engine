import type { TCameraServiceDependencies, TCameraTransformAgents, TCameraTransformDrive, TCommonCameraParams } from '@hellpig/anarchy-engine/Camera/Models';
import type { TTransformDriveParams } from '@hellpig/anarchy-engine/TransformDrive';

export function CameraTransformDrive(
  params: TCommonCameraParams,
  { transformDriveService }: Pick<TCameraServiceDependencies, 'transformDriveService'>,
  relatedEntityId: string
): TCameraTransformDrive {
  const transformAgents: TCameraTransformAgents = transformDriveService.getTransformAgents(params, { hasConnected: true }) as TCameraTransformAgents;
  const driveParams: TTransformDriveParams = { activeAgent: params.agent, relatedEntityId };

  return transformDriveService.create(driveParams, transformAgents) as TCameraTransformDrive;
}
