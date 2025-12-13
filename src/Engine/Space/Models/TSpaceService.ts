import type { TAppCanvas } from '@/Engine/App';

import type { TSpace } from './TSpace';
import type { TSpaceConfig } from './TSpaceConfig';

export type TSpaceService = Readonly<{
  buildSpaceFromConfig: (canvas: TAppCanvas, config: TSpaceConfig) => Promise<TSpace>;
}>;
