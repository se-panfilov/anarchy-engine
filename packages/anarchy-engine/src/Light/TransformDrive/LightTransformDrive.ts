import type { TLightParams, TLightServiceDependencies, TLightTransformAgents, TLightTransformDrive } from '@hellpig/anarchy-engine/Light/Models';
import type { TTransformDriveParams } from '@hellpig/anarchy-engine/TransformDrive';

export function LightTransformDrive(params: TLightParams, { transformDriveService }: Pick<TLightServiceDependencies, 'transformDriveService'>, relatedEntityId: string): TLightTransformDrive {
  const transformAgents: TLightTransformAgents = transformDriveService.getTransformAgents(params, { hasConnected: true }) as TLightTransformAgents;
  const driveParams: TTransformDriveParams = { activeAgent: params.agent, relatedEntityId };

  return transformDriveService.create(driveParams, transformAgents) as TLightTransformDrive;
}
