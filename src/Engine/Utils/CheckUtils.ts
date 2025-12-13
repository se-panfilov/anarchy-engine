import { Color } from 'three';

import type { IDestroyable, IReactiveDestroyable, IRegistrable } from '@/Engine/Domains/Mixins';
import type { IColorWrapper } from '@/Engine/Wrappers';

export function isDefined<T>(value: T | undefined | null): value is T {
  return <T>value !== undefined && <T>value !== null;
}

export function isNotDefined<T>(value: T | undefined | null): value is undefined | null {
  return <T>value === undefined || <T>value === null;
}

export function isRegistrable<T>(obj: T | IRegistrable): obj is IRegistrable {
  return isDefined((obj as unknown as IRegistrable).isRegistrable) && Boolean((obj as unknown as IRegistrable).isRegistrable);
}

export function isReactiveDestroyable<T>(obj: T | IReactiveDestroyable): obj is IReactiveDestroyable {
  return isDefined((obj as unknown as IReactiveDestroyable).destroyed$);
}

export function isDestroyable<T>(obj: T | IDestroyable): obj is IDestroyable {
  return isDefined((obj as unknown as IDestroyable).destroy);
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isColorWrapper(obj: unknown): obj is IColorWrapper {
  return isDefined((obj as IColorWrapper).entity) && (obj as IColorWrapper).entity instanceof Color;
}
