import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import type { TText2dWrapper, TTextAnyWrapper, TTextConfig } from '@/Engine/Text/Models';
import { filterOutEmptyFields, isNotDefined } from '@/Engine/Utils';

export function textToConfig(entity: TTextAnyWrapper): TTextConfig {
  const { drive } = entity;
  // TODO 15-0-0: implement 2d
  // TODO 15-0-0: implement 3d
  // TODO 15-0-0: implement texture
  // TODO 15-0-0: Check if we need distinct adapters for each type of text

  return filterOutEmptyFields({
    text: entity.getText(),
    type: entity.type,
    cssProps: extractInlineStyles((entity as TText2dWrapper).getElement()),
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

function extractInlineStyles(element: HTMLElement | undefined): Record<string, string> | undefined {
  if (isNotDefined(element)) return undefined;

  const result: Record<string, string> = {};
  // eslint-disable-next-line functional/no-loop-statements
  for (let i: number = 0; i < element.style.length; i++) {
    const prop: string = element.style[i];
    // eslint-disable-next-line functional/immutable-data
    result[prop] = element.style.getPropertyValue(prop);
  }
  return result;
}
