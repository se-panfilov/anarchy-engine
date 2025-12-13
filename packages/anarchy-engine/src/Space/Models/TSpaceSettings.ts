import type { TLoopsSettings } from '@Anarchy/Engine/Loop/Models';
import type { TThreeJsSettings } from '@Anarchy/Engine/ThreeLib';
import type { TOptional } from '@Anarchy/Shared/Utils';

export type TSpaceSettings = Readonly<{
  loopsSettings?: TOptional<TLoopsSettings>;
  threeJsSettings?: TOptional<TThreeJsSettings>;
}>;
