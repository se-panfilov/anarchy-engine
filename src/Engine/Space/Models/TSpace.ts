import type { TEntity } from '@/Engine/Abstract';

import type { TSpaceCanvas } from './TSpaceCanvas';
import type { TSpaceParts } from './TSpaceParts';

export type TSpace = TEntity<
  TSpaceParts &
    Readonly<{
      getCanvasElement: () => TSpaceCanvas | never;
    }>
>;
