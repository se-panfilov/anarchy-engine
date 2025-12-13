import type { TTextParams, TTextServiceDependencies, TTextTransformAgents, TTextTransformDrive } from '@/Engine/Text/Models';
import type { TTransformDriveParams } from '@/Engine/TransformDrive';

export function TextTransformDrive(params: TTextParams, { transformDriveService }: Pick<TTextServiceDependencies, 'transformDriveService'>, relatedEntityId: string): TTextTransformDrive {
  const transformAgents: TTextTransformAgents = transformDriveService.getTransformAgents(params, {
    isKinematic: true,
    isPhysics: true,
    isConnected: true
  }) as TTextTransformAgents;
  const driveParams: TTransformDriveParams = { activeAgent: params.agent, relatedEntityId };

  return transformDriveService.create(driveParams, transformAgents) as TTextTransformDrive;
}
