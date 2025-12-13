import { BlendingMap } from '@/Engine/Material/Constants';
import type { IMaterialConfig, IMaterialParams } from '@/Engine/Material/Models';
import { isDefined } from '@/Engine/Utils';

export function configToParams(config: IMaterialConfig): IMaterialParams {
  const { blending, ...rest } = config;

  let params: IMaterialParams = {} as IMaterialParams;

  if (isDefined(blending)) params = { ...params, blending: BlendingMap[blending] };

  return {
    ...params,
    ...rest
  };
}
