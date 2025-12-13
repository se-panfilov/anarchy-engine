export type TWriteable<T> = { -readonly [P in keyof T]: T[P] };

export type TDeepWriteable<T> = { -readonly [P in keyof T]: TDeepWriteable<T[P]> };

export type TOptional<T> = {
  [P in keyof T]?: T[P];
};

export type TValueOf<T> = T[keyof T];
