export type IWriteable<T> = { -readonly [P in keyof T]: T[P] };

export type IDeepWriteable<T> = { -readonly [P in keyof T]: IDeepWriteable<T[P]> };

export type INullable<T> = {
  -readonly [P in keyof T]: T[P] | undefined | null;
};
