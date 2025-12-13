import type { BufferGeometry, Euler, Material, Quaternion, QuaternionLike, Vector2, Vector2Like, Vector3, Vector3Like, Vector4, Vector4Like } from 'three';
import { Color } from 'three';

import type { TAbstractAsyncRegistry, TAbstractEntityRegistry, TWithUserData, TWithWrapperId, TWithWrapperIdEntity } from '@/Engine/Abstract/Models';
import type { TColorWrapper } from '@/Engine/Color';
import type { TDestroyable, TWithPosition2dProperty, TWithPosition3dProperty, TWithPosition4dProperty, TWithPositionProperty } from '@/Engine/Mixins';
import type { TEulerLike } from '@/Engine/ThreeLib';

import { isObject } from './ObjectUtils';

export const isDefined = <T>(value: T | undefined | null): value is T => <T>value !== undefined && <T>value !== null;

export const isAllDefined = <T>(values: ReadonlyArray<T | undefined | null>): values is ReadonlyArray<T> => !values.some(isNotDefined);

export const isNotDefined = <T>(value: T | undefined | null): value is undefined | null => !isDefined<T>(value);

export const isAllNotDefined = <T>(values: ReadonlyArray<T | undefined | null>): values is ReadonlyArray<undefined | null> => values.every(isNotDefined);

export function isDestroyable(obj: unknown): obj is TDestroyable {
  return isDefined((obj as TDestroyable).destroy$);
}

export const isString = (value: unknown): value is string => typeof value === 'string';

export const isColorWrapper = (obj: unknown): obj is TColorWrapper => isDefined((obj as TColorWrapper).entity) && (obj as TColorWrapper).entity instanceof Color;

export const isWithUserData = (entity: any): entity is TWithUserData => isDefined((entity as TWithUserData).userData);

export const isWithWrapperIdAccessors = (entity: any): entity is TWithWrapperId => isDefined((entity as TWithWrapperId).setWrapperId) && isDefined((entity as TWithWrapperId).getWrapperId);

export function isWithWrapperId<T extends TWithUserData>(obj: unknown): obj is TWithWrapperIdEntity<T> {
  return isDefined(obj) && isObject(obj) && isDefined((obj as TWithWrapperIdEntity<T>).userData) && isDefined((obj as TWithWrapperIdEntity<T>).userData.wrapperId);
}

type TMetrics = Vector2 | Vector3 | Vector4 | Vector2Like | Vector3Like | Vector4Like | Quaternion | Euler | QuaternionLike | TEulerLike;
export const isVector2Like = (obj: TMetrics): obj is Vector2Like => isDefined(obj.x) && isDefined(obj.x) && isNotDefined((obj as Vector3).z) && isNotDefined((obj as Vector4).w);
export const isVector3Like = (obj: TMetrics): obj is Vector3Like => isDefined(obj.x) && isDefined(obj.x) && isDefined((obj as Vector3).z) && isNotDefined((obj as Vector4).w);
export const isVector4Like = (obj: TMetrics): obj is Vector4Like => isDefined(obj.x) && isDefined(obj.x) && isDefined((obj as Vector4).z) && isDefined((obj as Vector4).w);

// TODO add unit tests
export const isQuaternionLike = (obj: TMetrics): obj is QuaternionLike => isVector4Like(obj as Vector4);
// TODO add unit tests
export const isEulerLike = (obj: TMetrics): obj is Euler => isVector3Like(obj as Vector3);

export const isEntityWith2dPosition = (obj: TWithPositionProperty): obj is TWithPosition2dProperty => isVector2Like(obj.position as Vector2);
export const isEntityWith3dPosition = (obj: TWithPositionProperty): obj is TWithPosition3dProperty => isVector3Like(obj.position as Vector3);
export const isEntityWith4dPosition = (obj: TWithPositionProperty): obj is TWithPosition4dProperty => isVector4Like(obj.position as Vector4);

export const isAsyncRegistry = (registry: TAbstractEntityRegistry<any> | TAbstractAsyncRegistry<any>): registry is TAbstractAsyncRegistry<any> =>
  isDefined((registry as TAbstractAsyncRegistry<any>).findByTagsAsync) && isDefined((registry as TAbstractAsyncRegistry<any>).findByTagAsync);

export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';

export const hasMaterial = (entity: unknown): entity is { material?: Material | Array<Material> | null } => isDefined((entity as any).material);

export const hasGeometry = (entity: unknown): entity is { geometry?: BufferGeometry | null } => isDefined((entity as any).geometry);
