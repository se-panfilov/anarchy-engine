import { Color } from 'three';

import type { TAbstractAsyncRegistry, TAbstractEntityRegistry, TWithUserData, TWithWrapperId, TWithWrapperIdEntity } from '@/Engine/Abstract/Models';
import type { IColorWrapper } from '@/Engine/Color';
import type { TDestroyable, TRegistrable, IWithPosition2dProperty, IWithPosition3dProperty, IWithPosition4dProperty, IWithPositionProperty } from '@/Engine/Mixins';
import type { TVector2, TVector2Wrapper, TVector3, TVector3Wrapper, TVector4, TVector4Wrapper } from '@/Engine/Vector';

import { isObject } from './ObjectUtils';

export function isDefined<T>(value: T | undefined | null): value is T {
  return <T>value !== undefined && <T>value !== null;
}

export function isNotDefined<T>(value: T | undefined | null): value is undefined | null {
  return !isDefined<T>(value);
}

export function isRegistrable(obj: unknown): obj is TRegistrable {
  return isDefined((obj as TRegistrable).getTags) && Boolean((obj as TRegistrable).addTag);
}

export function isDestroyable(obj: unknown): obj is TDestroyable {
  return isDefined((obj as TDestroyable).destroy) && isDefined((obj as TDestroyable).destroyed$) && isDefined((obj as TDestroyable).isDestroyed);
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isColorWrapper(obj: unknown): obj is IColorWrapper {
  return isDefined((obj as IColorWrapper).entity) && (obj as IColorWrapper).entity instanceof Color;
}

export const isWithUserData = (entity: any): entity is TWithUserData => isDefined((entity as TWithUserData).userData);

export const isWithWrapperIdAccessors = (entity: any): entity is TWithWrapperId => isDefined((entity as TWithWrapperId).setWrapperId) && isDefined((entity as TWithWrapperId).getWrapperId);

export function isWithWrapperId<T extends TWithUserData>(obj: unknown): obj is TWithWrapperIdEntity<T> {
  return isDefined(obj) && isObject(obj) && isDefined((obj as TWithWrapperIdEntity<T>).userData) && isDefined((obj as TWithWrapperIdEntity<T>).userData.wrapperId);
}

export const isVector2 = (obj: TVector2 | TVector3 | TVector4): obj is TVector2 => isDefined(obj.x) && isDefined(obj.x) && isNotDefined((obj as TVector3).z) && isNotDefined((obj as TVector4).w);
export const isVector3 = (obj: TVector2 | TVector3 | TVector4): obj is TVector3 => isDefined(obj.x) && isDefined(obj.x) && isDefined((obj as TVector3).z) && isNotDefined((obj as TVector4).w);
export const isVector4 = (obj: TVector2 | TVector3 | TVector4): obj is TVector4 => isDefined(obj.x) && isDefined(obj.x) && isDefined((obj as TVector4).z) && isDefined((obj as TVector4).w);

export const isVector2Wrapper = (obj: TVector2Wrapper | TVector3Wrapper): obj is TVector2Wrapper => isVector2(obj.entity);
export const isVector3Wrapper = (obj: TVector2Wrapper | TVector3Wrapper): obj is TVector3Wrapper => isVector3(obj.entity);
export const isVector4Wrapper = (obj: TVector2Wrapper | TVector3Wrapper): obj is TVector4Wrapper => isVector4(obj.entity);

export const isEntityWith2dPosition = (obj: IWithPositionProperty): obj is IWithPosition2dProperty => isVector2(obj.position as TVector2);
export const isEntityWith3dPosition = (obj: IWithPositionProperty): obj is IWithPosition3dProperty => isVector3(obj.position as TVector3);
export const isEntityWith4dPosition = (obj: IWithPositionProperty): obj is IWithPosition4dProperty => isVector4(obj.position as TVector4);

export const isAsyncRegistry = (registry: TAbstractEntityRegistry<any> | TAbstractAsyncRegistry<any>): registry is TAbstractAsyncRegistry<any> =>
  isDefined((registry as TAbstractAsyncRegistry<any>).findByTagsAsync) && isDefined((registry as TAbstractAsyncRegistry<any>).findByTagAsync);

export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';
