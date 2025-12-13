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

export type TWithMandatoryField<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type TValueOf<T> = T[keyof T];
