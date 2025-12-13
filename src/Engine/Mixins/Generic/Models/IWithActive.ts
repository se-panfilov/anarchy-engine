export type IWithActive<T> = T &
  Readonly<{
    _setActive: (isActive: boolean, isFromService?: boolean) => void;
    isActive: boolean;
  }>;
