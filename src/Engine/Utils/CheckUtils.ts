import type { IRegistrable } from '@/Engine/Domains/Mixins';

export function isDefined<T>(value: T | undefined | null): value is T {
  return <T>value !== undefined && <T>value !== null;
}

export function isNotDefined<T>(value: T | undefined | null): value is undefined | null {
  return <T>value === undefined || <T>value === null;
}

export function isRegistrable<T>(obj: T | IRegistrable): obj is IRegistrable {
  return isDefined((obj as unknown as IRegistrable).isRegistrable) && Boolean((obj as unknown as IRegistrable).isRegistrable);
}
