import type { IActive } from '@/Engine/Mixins/Generic';

export type IWithActive<T> = T &
  Readonly<{
    _setActive: (isActive: boolean, isFromService?: boolean) => void;
  }> &
  IActive;
