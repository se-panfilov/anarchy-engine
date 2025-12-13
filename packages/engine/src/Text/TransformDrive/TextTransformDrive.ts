import type { TTextParams, TTextServiceDependencies, TTextTransformAgents, TTextTransformDrive } from '@/Text/Models';
import type { TTransformDriveParams } from '@/TransformDrive';

export function TextTransformDrive(params: TTextParams, { transformDriveService }: Pick<TTextServiceDependencies, 'transformDriveService'>, relatedEntityId: string): TTextTransformDrive {
  const transformAgents: TTextTransformAgents = transformDriveService.getTransformAgents(params, {
    hasKinematic: true,
    hasPhysics: true,
    hasConnected: true
  }) as TTextTransformAgents;
  const driveParams: TTransformDriveParams = { activeAgent: params.agent, relatedEntityId };

  return transformDriveService.create(driveParams, transformAgents) as TTextTransformDrive;
}
