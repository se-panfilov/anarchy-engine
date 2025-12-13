import type { TRegistrable } from './TRegistrable';

export type TMultitonRegistrable = TRegistrable &
  Readonly<{
    key: string;
  }>;
