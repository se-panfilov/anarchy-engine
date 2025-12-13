import type { TAnimationsService } from '@/Engine/Animations/Models';
import type { TModel3dPack, TModels3dFacadeParams } from '@/Engine/Models3d/Models';
import { isDefined } from '@/Engine/Utils';

export function createModels3dEntities(params: TModels3dFacadeParams, animationsService: TAnimationsService): TModel3dPack {
  if (isDefined(params.actions) && isDefined(params.mixer)) return { ...params } as TModel3dPack;
  const { actions, mixer } = animationsService.createActions(params.model, params.animations ?? {});
  return { ...params, actions, mixer };
}
