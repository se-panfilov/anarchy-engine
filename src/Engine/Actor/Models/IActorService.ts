import type { IDestroyable } from '@/Engine/Mixins';

import type { IActorConfig } from './IActorConfig';
import type { IActorParams } from './IActorParams';
import type { IActorWrapperAsync } from './IActorWrapperAsync';

export type IActorService = Readonly<{
  createAsync: (params: IActorParams) => Promise<IActorWrapperAsync>;
  createFromConfig: (actors: ReadonlyArray<IActorConfig>) => void;
}> &
  IDestroyable;
