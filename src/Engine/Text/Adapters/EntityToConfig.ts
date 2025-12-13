import type { Vector2 } from 'three';

import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import type { TText2dWrapper, TTextAnyWrapper, TTextConfig } from '@/Engine/Text/Models';
import { filterOutEmptyFields, isNotDefined, kebabToCamel, vector2ToXy } from '@/Engine/Utils';

// TODO 15-0-0: validate result
export function textToConfig(entity: TTextAnyWrapper): TTextConfig {
  const { drive } = entity;

  const center: Vector2 | undefined = (entity as TText2dWrapper).entity.center;

  return filterOutEmptyFields({
    text: entity.getText(),
    type: entity.type,
    cssProps: extractInlineStyles((entity as TText2dWrapper).getElement()),
    elementType: (entity as TText2dWrapper).getElement()?.tagName,
    center: center ? vector2ToXy(center) : undefined,
    physics: drive.physical?.serialize(),
    // TODO 15-0-0: Why kinematic is always exist?
    kinematic: drive.kinematic?.serialize(),
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
    const propName: string = kebabToCamel(prop);
    // eslint-disable-next-line functional/immutable-data
    result[propName] = element.style.getPropertyValue(prop);
  }
  if (Object.keys(result).length === 0) return undefined;
  return result;
}
