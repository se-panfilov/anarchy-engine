import type { TLightParams, TLightServiceDependencies, TLightTransformAgents, TLightTransformDrive } from '@/Light/Models';
import type { TTransformDriveParams } from '@/TransformDrive';

export function LightTransformDrive(params: TLightParams, { transformDriveService }: Pick<TLightServiceDependencies, 'transformDriveService'>, relatedEntityId: string): TLightTransformDrive {
  const transformAgents: TLightTransformAgents = transformDriveService.getTransformAgents(params, { hasConnected: true }) as TLightTransformAgents;
  const driveParams: TTransformDriveParams = { activeAgent: params.agent, relatedEntityId };

  return transformDriveService.create(driveParams, transformAgents) as TLightTransformDrive;
}
