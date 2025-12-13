export type TWriteable<T> = { -readonly [P in keyof T]: T[P] };

export type TDeepWriteable<T> = { -readonly [P in keyof T]: TDeepWriteable<T[P]> };

export type TOptional<T> = {
  [P in keyof T]?: T[P];
};

export type TWithNull<T> = {
  [P in keyof T]: T[P] | null;
};

export type TWithUndefined<T> = {
  [P in keyof T]: T[P] | undefined;
};

export type TWithoutNull<T> = {
  [K in keyof T]: Exclude<T[K], null> extends never ? undefined : Exclude<T[K], null> | undefined;
};

export type TWithMandatoryField<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type TValueOf<T> = T[keyof T];

export type TNullToUndefined<T> = {
  [K in keyof T]: T[K] extends null ? undefined : T[K] extends null | infer U ? U | undefined : T[K];
};

export function nullsToUndefined<T extends Record<string, any>>(obj: T): TNullToUndefined<T> {
  const result = {} as TNullToUndefined<T>;
  // eslint-disable-next-line functional/no-loop-statements
  for (const key in obj) {
    const value = obj[key];
    // eslint-disable-next-line functional/immutable-data
    (result as any)[key] = value === null ? undefined : value;
  }
  return result;
}

export type TUnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

export type TDeepPartial<T> = T extends ReadonlyArray<infer U> ? ReadonlyArray<TDeepPartial<U>> : T extends object ? { readonly [K in keyof T]?: TDeepPartial<T[K]> } : T;
