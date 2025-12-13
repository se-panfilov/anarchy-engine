import type { IRegistrable } from '@/Engine';

export type IMultitonRegistrable = IRegistrable & {
  key: string;
};
