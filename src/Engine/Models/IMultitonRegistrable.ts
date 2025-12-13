import type { IRegistrable } from '@Engine/Models/IRegistrable';

export type IMultitonRegistrable = IRegistrable &
  Readonly<{
    key: string;
  }>;
