import type { IRegistrable } from '@Engine/Mixins';

export type IMultitonRegistrable = IRegistrable &
  Readonly<{
    key: string;
  }>;
