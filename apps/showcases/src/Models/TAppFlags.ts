import type { TSpaceFlags } from '@Engine';

export type TAppFlags = TSpaceFlags &
  Readonly<{
    loopsDebugInfo: boolean;
  }>;
