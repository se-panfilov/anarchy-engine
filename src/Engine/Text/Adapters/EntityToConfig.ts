import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import type { TText2dWrapper, TTextAnyWrapper, TTextConfig } from '@/Engine/Text/Models';
import { filterOutEmptyFields } from '@/Engine/Utils';

export function textToConfig(entity: TTextAnyWrapper): TTextConfig {
  const { drive } = entity;
  // TODO 15-0-0: implement 2d
  // TODO 15-0-0: implement 3d
  // TODO 15-0-0: implement texture
  // TODO 15-0-0: Check if we need distinct adapters for each type of text

  const json = entity.entity.toJSON().object;

  return filterOutEmptyFields({
    text: entity.getText(),
    type: entity.type,
    // cssProps: (entity as TText2dWrapper).getCssProperty(),
    elementType: (entity as TText2dWrapper).getElement()?.tagName,
    center: undefined,
    kinematic: undefined,
    physics: undefined,
    receiveShadow: entity.getReceiveShadow(),
    frustumCulled: entity.getFrustumCulled(),
    renderOrder: entity.getRenderOrder(),
    visible: entity.getVisible(),
    castShadow: entity.getCastShadow(),
    ...extractSerializableRegistrableFields(entity),
    ...drive.serialize()
  });
}
