import { Color } from 'three';

import type { IAbstractEntityWithWrapperId } from '@/Engine/Domains/Abstract/Models';
import type { IDestroyable, IRegistrable } from '@/Engine/Mixins';
import type { IColorWrapper } from '@/Engine/Wrappers';

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
