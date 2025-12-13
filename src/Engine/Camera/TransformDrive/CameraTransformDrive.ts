import type { TCameraParams, TCameraServiceDependencies, TCameraTransformAgents, TCameraTransformDrive } from '@/Engine/Camera/Models';
import type { TTransformDriveParams } from '@/Engine/TransformDrive';

export function CameraTransformDrive(params: TCameraParams, { transformDriveService }: Pick<TCameraServiceDependencies, 'transformDriveService'>, relatedEntityId: string): TCameraTransformDrive {
  const transformAgents: TCameraTransformAgents = transformDriveService.getTransformAgents(params, { isConnected: true }) as TCameraTransformAgents;
  const driveParams: TTransformDriveParams = { activeAgent: params.agent, relatedEntityId };

  return transformDriveService.create(driveParams, transformAgents) as TCameraTransformDrive;
}
