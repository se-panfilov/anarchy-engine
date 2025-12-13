export const isDefined = <T>(value: T | undefined | null): value is T => <T>value !== undefined && <T>value !== null;

export const isAllDefined = <T>(values: ReadonlyArray<T | undefined | null>): values is ReadonlyArray<T> => !values.some(isNotDefined);

export const isNotDefined = <T>(value: T | undefined | null): value is undefined | null => !isDefined<T>(value);

export const isAllNotDefined = <T>(values: ReadonlyArray<T | undefined | null>): values is ReadonlyArray<undefined | null> => values.every(isNotDefined);

export const isString = (value: unknown): value is string => typeof value === 'string';

export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';
