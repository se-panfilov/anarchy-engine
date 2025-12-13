import type { TLoopsSettings } from '@Engine/Loop/Models';
import type { TOptional } from '@Engine/Utils';

export type TSpaceSettings = Readonly<{
  loopsSettings?: TOptional<TLoopsSettings>;
}>;
