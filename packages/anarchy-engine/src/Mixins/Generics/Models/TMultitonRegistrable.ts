import type { TNoSpread } from './TNoSpread';
import type { TRegistrable } from './TRegistrable';

export type TMultitonRegistrable = Readonly<{
  key: string;
}> &
  TRegistrable &
  TNoSpread;
