export type IWithActive<T> = T &
  Readonly<{
    _setActive: (isActive: boolean) => void;
    isActive: boolean;
  }>;
