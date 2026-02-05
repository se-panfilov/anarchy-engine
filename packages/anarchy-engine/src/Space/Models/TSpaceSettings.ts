import type { TLoopsSettings } from '@hellpig/anarchy-engine/Loop/Models';
import type { TThreeJsSettings } from '@hellpig/anarchy-engine/ThreeLib';
import type { TOptional } from '@hellpig/anarchy-shared/Utils';

export type TSpaceSettings = Readonly<{
  loopsSettings?: TOptional<TLoopsSettings>;
  threeJsSettings?: TOptional<TThreeJsSettings>;
}>;
