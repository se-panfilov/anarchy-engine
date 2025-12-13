import type { TFogParams } from './TFogParams';

export type TFogConfig = Omit<TFogParams, 'color'> &
  Readonly<{
    color: string;
  }>;
