import type { TNoSpread } from '@/Mixins';

import type { TRegistrable } from './TRegistrable';

export type TMultitonRegistrable = Readonly<{
  key: string;
}> &
  TRegistrable &
  TNoSpread;
