import { Color } from 'three';

import type { IAbstractEntityWithWrapperId } from '@/Engine/Domains/Abstract/Models';
import type { IDestroyable, IRegistrable, IWithPosition2dProperty, IWithPosition3dProperty, IWithPosition4dProperty, IWithPositionProperty } from '@/Engine/Mixins';
import type { IColorWrapper, IVector2, IVector2Wrapper, IVector3, IVector3Wrapper, IVector4, IVector4Wrapper } from '@/Engine/Wrappers';

import { isObject } from './ObjectUtils';

export function isDefined<T>(value: T | undefined | null): value is T {
  return <T>value !== undefined && <T>value !== null;
}

export function isNotDefined<T>(value: T | undefined | null): value is undefined | null {
  return !isDefined<T>(value);
}

export function isRegistrable<T>(obj: T | IRegistrable): obj is IRegistrable {
  return isDefined((obj as unknown as IRegistrable).getTags) && Boolean((obj as unknown as IRegistrable).addTag);
}

export function isDestroyable<T>(obj: T | IDestroyable): obj is IDestroyable {
  return isDefined((obj as unknown as IDestroyable).destroy) && isDefined((obj as unknown as IDestroyable).destroyed$) && isDefined((obj as unknown as IDestroyable).isDestroyed);
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isColorWrapper(obj: unknown): obj is IColorWrapper {
  return isDefined((obj as IColorWrapper).entity) && (obj as IColorWrapper).entity instanceof Color;
}

export function isWithWrapperId(obj: unknown): obj is IAbstractEntityWithWrapperId {
  return isDefined(obj) && isObject(obj) && isDefined((obj as IAbstractEntityWithWrapperId).userData) && isDefined((obj as IAbstractEntityWithWrapperId).userData.wrapperId);
}

export const isVector2 = (obj: IVector2 | IVector3 | IVector4): obj is IVector2 => isDefined(obj.x) && isDefined(obj.x) && isNotDefined((obj as IVector3).z) && isNotDefined((obj as IVector4).w);
export const isVector3 = (obj: IVector2 | IVector3 | IVector4): obj is IVector3 => isDefined(obj.x) && isDefined(obj.x) && isDefined((obj as IVector3).z) && isNotDefined((obj as IVector4).w);
export const isVector4 = (obj: IVector2 | IVector3 | IVector4): obj is IVector4 => isDefined(obj.x) && isDefined(obj.x) && isDefined((obj as IVector4).z) && isDefined((obj as IVector4).w);

export const isVector2Wrapper = (obj: IVector2Wrapper | IVector3Wrapper | IVector4Wrapper): obj is IVector2Wrapper => isVector2(obj.entity);
export const isVector3Wrapper = (obj: IVector2Wrapper | IVector3Wrapper | IVector4Wrapper): obj is IVector3Wrapper => isVector3(obj.entity);
export const isVector4Wrapper = (obj: IVector2Wrapper | IVector3Wrapper | IVector4Wrapper): obj is IVector4Wrapper => isVector4(obj.entity);

export const isEntityWith2dPosition = (obj: IWithPositionProperty): obj is IWithPosition2dProperty => isVector2(obj.position as IVector2);
export const isEntityWith3dPosition = (obj: IWithPositionProperty): obj is IWithPosition3dProperty => isVector3(obj.position as IVector3);
export const isEntityWith4dPosition = (obj: IWithPositionProperty): obj is IWithPosition4dProperty => isVector4(obj.position as IVector4);
