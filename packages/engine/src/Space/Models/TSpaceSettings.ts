import type { TLoopsSettings } from '@Engine/Loop/Models';
import type { TThreeJsSettings } from '@Engine/ThreeLib';
import type { TOptional } from '@Engine/Utils';

export type TSpaceSettings = Readonly<{
  loopsSettings?: TOptional<TLoopsSettings>;
  threeJsSettings?: TOptional<TThreeJsSettings>;
}>;
