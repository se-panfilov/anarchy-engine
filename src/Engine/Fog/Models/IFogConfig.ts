import type { TWithReadonlyTags } from '@/Engine/Mixins';

import type { IFogProps } from './IFogProps';

export type IFogConfig = Omit<IFogProps, 'color'> &
  Readonly<{
    color: string;
  }> &
  TWithReadonlyTags;
