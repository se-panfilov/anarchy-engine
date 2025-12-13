import type { IActive } from '@/Engine/Mixins/Generic';

export type IWithActive = Readonly<{
  _setActive: (isActive: boolean, isFromService?: boolean) => void;
}> &
  IActive;
