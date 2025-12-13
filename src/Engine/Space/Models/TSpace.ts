import type { TEntity } from '@/Engine/Abstract';
import type { TContainerDecorator } from '@/Engine/Global';

import type { TSpaceCanvas } from './TSpaceCanvas';
import type { TSpaceParts } from './TSpaceParts';

export type TSpace = TEntity<
  TSpaceParts &
    Readonly<{
      getCanvasElement: () => TSpaceCanvas | never;
      container: TContainerDecorator;
      drop: () => void;
    }>
>;
