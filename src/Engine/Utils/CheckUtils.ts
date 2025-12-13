import type { Vector2, Vector4 } from 'three';
import { Color } from 'three';
import type { Vector3 } from 'three/src/math/Vector3';

import type { TAbstractAsyncRegistry, TAbstractEntityRegistry, TWithUserData, TWithWrapperId, TWithWrapperIdEntity } from '@/Engine/Abstract/Models';
import type { TColorWrapper } from '@/Engine/Color';
import type { TDestroyable, TRegistrable, TWithPosition2dProperty, TWithPosition3dProperty, TWithPosition4dProperty, TWithPositionProperty } from '@/Engine/Mixins';

import { isObject } from './ObjectUtils';

export const isDefined = <T>(value: T | undefined | null): value is T => <T>value !== undefined && <T>value !== null;

export const isAllDefined = <T>(values: ReadonlyArray<T | undefined | null>): values is ReadonlyArray<T> => !values.some(isNotDefined);

export const isNotDefined = <T>(value: T | undefined | null): value is undefined | null => !isDefined<T>(value);

export const isAllNotDefined = <T>(values: ReadonlyArray<T | undefined | null>): values is ReadonlyArray<undefined | null> => values.every(isNotDefined);

export const isRegistrable = (obj: unknown): obj is TRegistrable => isDefined((obj as TRegistrable).getTags) && Boolean((obj as TRegistrable).addTag);

export function isDestroyable(obj: unknown): obj is TDestroyable {
  return isDefined((obj as TDestroyable).destroy) && isDefined((obj as TDestroyable).destroyed$) && isDefined((obj as TDestroyable).isDestroyed);
}

export const isString = (value: unknown): value is string => typeof value === 'string';

export const isColorWrapper = (obj: unknown): obj is TColorWrapper => isDefined((obj as TColorWrapper).entity) && (obj as TColorWrapper).entity instanceof Color;

export const isWithUserData = (entity: any): entity is TWithUserData => isDefined((entity as TWithUserData).userData);

export const isWithWrapperIdAccessors = (entity: any): entity is TWithWrapperId => isDefined((entity as TWithWrapperId).setWrapperId) && isDefined((entity as TWithWrapperId).getWrapperId);

export function isWithWrapperId<T extends TWithUserData>(obj: unknown): obj is TWithWrapperIdEntity<T> {
  return isDefined(obj) && isObject(obj) && isDefined((obj as TWithWrapperIdEntity<T>).userData) && isDefined((obj as TWithWrapperIdEntity<T>).userData.wrapperId);
}

export const isVector2 = (obj: Vector2 | Vector3 | Vector4): obj is Vector2 => isDefined(obj.x) && isDefined(obj.x) && isNotDefined((obj as Vector3).z) && isNotDefined((obj as Vector4).w);
export const isVector3 = (obj: Vector2 | Vector3 | Vector4): obj is Vector3 => isDefined(obj.x) && isDefined(obj.x) && isDefined((obj as Vector3).z) && isNotDefined((obj as Vector4).w);
export const isVector4 = (obj: Vector2 | Vector3 | Vector4): obj is Vector4 => isDefined(obj.x) && isDefined(obj.x) && isDefined((obj as Vector4).z) && isDefined((obj as Vector4).w);

export const isEntityWith2dPosition = (obj: TWithPositionProperty): obj is TWithPosition2dProperty => isVector2(obj.position as Vector2);
export const isEntityWith3dPosition = (obj: TWithPositionProperty): obj is TWithPosition3dProperty => isVector3(obj.position as Vector3);
export const isEntityWith4dPosition = (obj: TWithPositionProperty): obj is TWithPosition4dProperty => isVector4(obj.position as Vector4);

export const isAsyncRegistry = (registry: TAbstractEntityRegistry<any> | TAbstractAsyncRegistry<any>): registry is TAbstractAsyncRegistry<any> =>
  isDefined((registry as TAbstractAsyncRegistry<any>).findByTagsAsync) && isDefined((registry as TAbstractAsyncRegistry<any>).findByTagAsync);

export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';
