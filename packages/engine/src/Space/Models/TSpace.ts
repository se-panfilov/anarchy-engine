import type { TEntity } from '@Engine/Abstract';
import type { TContainerDecorator } from '@Engine/Global';
import type { Observable } from 'rxjs';

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
