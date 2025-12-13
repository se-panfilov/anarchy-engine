import type { TAppCanvas } from '@/Engine/App';

import type { TSpace } from './TSpace';
import type { TSpaceConfig } from './TSpaceConfig';
import type { TSpaceHooks } from './TSpaceHooks';

export type TSpaceService = Readonly<{
  buildSpaceFromConfig: (canvas: TAppCanvas, config: TSpaceConfig, hooks?: TSpaceHooks) => Promise<TSpace>;
}>;
