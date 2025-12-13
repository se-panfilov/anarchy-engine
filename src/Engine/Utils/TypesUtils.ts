export type IWriteable<T> = { -readonly [P in keyof T]: T[P] };

export type IDeepWriteable<T> = { -readonly [P in keyof T]: IDeepWriteable<T[P]> };

export type IOptional<T> = {
  [P in keyof T]?: T[P];
};

export type IValueOf<T> = T[keyof T];
