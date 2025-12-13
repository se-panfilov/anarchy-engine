import type { TWithReadonlyTags } from '@/Engine/Mixins';

import type { TFogProps } from './TFogProps';

export type TFogConfig = Omit<TFogProps, 'color'> &
  Readonly<{
    color: string;
  }> &
  TWithReadonlyTags;
