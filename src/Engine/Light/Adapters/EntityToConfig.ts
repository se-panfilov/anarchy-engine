import type { TAbstractLightConfig, TAbstractLightWrapper, TLight } from '@/Engine/Light/Models';
import { extractRegistrableFields } from '@/Engine/Mixins';
import { filterOutEmptyFields } from '@/Engine/Utils';

export function lightToConfig<T extends TLight>(entity: TAbstractLightWrapper<T>): TAbstractLightConfig<T> {
  const { drive } = entity;
  // TODO 15-0-0: implement
  // TODO 15-0-0: implement distinct adapters for AbstractLightWrapper, AmbientLightWrapper,DirectionalLightWrapper, HemisphereLightWrapper, PointLightWrapper, RectAreaLightWrapper, SpotLightWrapper,

  return filterOutEmptyFields({
    ...extractRegistrableFields(entity),
    ...drive.serialize()
    // TODO 15-0-0: fix any
  }) as any;
}
