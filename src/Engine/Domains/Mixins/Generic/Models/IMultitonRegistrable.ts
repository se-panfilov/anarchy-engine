import type { IRegistrable } from './IRegistrable';

export type IMultitonRegistrable = IRegistrable &
  Readonly<{
    key: string;
  }>;
