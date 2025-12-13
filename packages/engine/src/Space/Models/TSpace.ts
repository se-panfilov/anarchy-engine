import type { Observable } from 'rxjs';

import type { TEntity } from '@/Abstract';
import type { TContainerDecorator } from '@/Global';

import type { TSpaceCanvas } from './TSpaceCanvas';
import type { TSpaceParts } from './TSpaceParts';

export type TSpace = TEntity<
  TSpaceParts &
    Readonly<{
      getCanvasElement: () => TSpaceCanvas | never;
      getCanvasSelector: () => string;
      container: TContainerDecorator;
      version: string;
      serializationInProgress$: Observable<boolean>;
      drop: () => void;
    }>
>;
