import type { IRegistrable } from '@/Engine';

export type IMultitonRegistrable = IRegistrable &
  Readonly<{
    key: string;
  }>;
