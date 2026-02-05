import type { TEntity } from '@hellpig/anarchy-engine/Abstract';
import type { TContainerDecorator } from '@hellpig/anarchy-engine/Global';
import type { Observable, Subject } from 'rxjs';

import type { TSpaceCanvas } from './TSpaceCanvas';
import type { TSpaceAnyEvent } from './TSpaceEvents';
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
      events$: Subject<TSpaceAnyEvent>;
    }>
>;
