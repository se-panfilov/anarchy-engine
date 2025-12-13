import type { TLoopsSettings } from '@Anarchy/Engine/Loop/Models';
import type { TThreeJsSettings } from '@Anarchy/Engine/ThreeLib';
import type { TOptional } from '@Shared/Utils';

export type TSpaceSettings = Readonly<{
  loopsSettings?: TOptional<TLoopsSettings>;
  threeJsSettings?: TOptional<TThreeJsSettings>;
}>;
