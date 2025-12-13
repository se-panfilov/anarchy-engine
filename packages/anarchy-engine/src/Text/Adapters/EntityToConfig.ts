import { extractSerializableRegistrableFields } from '@Anarchy/Engine/Mixins';
import type { TText2dWrapper, TText3dTextureWrapper, TTextAnyWrapper, TTextConfig, TTextCssProps } from '@Anarchy/Engine/Text/Models';
import { vector2ToXy } from '@Anarchy/Engine/Utils';
import { filterOutEmptyFields, isNotDefined, kebabToCamel } from '@Anarchy/Shared/Utils';
import type { Vector2 } from 'three';

export function textToConfig(entity: TTextAnyWrapper): TTextConfig {
  const { drive } = entity;

  const center: Vector2 | undefined = (entity as TText2dWrapper).entity.center;

  return filterOutEmptyFields({
    text: entity.getText(),
    type: entity.type,
    cssProps: extractInlineStyles((entity as TText2dWrapper).getElement()) ?? (entity as TText3dTextureWrapper).getPropsAsCss(),
    elementType: (entity as TText2dWrapper).getElement()?.tagName,
    center: center ? vector2ToXy(center) : undefined,
    receiveShadow: entity.getReceiveShadow(),
    frustumCulled: entity.getFrustumCulled(),
    renderOrder: entity.getRenderOrder(),
    visible: entity.getVisible(),
    castShadow: entity.getCastShadow(),
    ...extractSerializableRegistrableFields(entity),
    ...drive.serialize()
  });
}

function extractInlineStyles(element: HTMLElement | undefined): TTextCssProps | undefined {
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
  return filterOutEmptyFields(result);
}
