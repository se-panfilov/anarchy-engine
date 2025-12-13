import type { TLightParams, TLightServiceDependencies, TLightTransformAgents, TLightTransformDrive } from '@/Engine/Light/Models';
import type { TTransformDriveParams } from '@/Engine/TransformDrive';

export function LightTransformDrive(params: TLightParams, { transformDriveService }: Pick<TLightServiceDependencies, 'transformDriveService'>, relatedEntityId: string): TLightTransformDrive {
  const transformAgents: TLightTransformAgents = transformDriveService.getTransformAgents(params, { isConnected: true }) as TLightTransformAgents;
  const driveParams: TTransformDriveParams = { activeAgent: params.agent, relatedEntityId };

  return transformDriveService.create(driveParams, transformAgents) as TLightTransformDrive;
}
