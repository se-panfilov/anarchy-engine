import type { IDestroyable } from '@/Engine/Mixins';
import type { ISceneWrapper } from '@/Engine/Scene';

import type { IActorAsyncRegistry } from './IActorAsyncRegistry';
import type { IActorConfig } from './IActorConfig';
import type { IActorFactory } from './IActorFactory';
import type { IActorParams } from './IActorParams';
import type { IActorWrapperAsync } from './IActorWrapperAsync';

export type IActorService = Readonly<{
  createAsync: (params: IActorParams) => Promise<IActorWrapperAsync>;
  createFromConfig: (actors: ReadonlyArray<IActorConfig>) => void;
  getFactory: () => IActorFactory;
  getRegistry: () => IActorAsyncRegistry;
  getScene: () => ISceneWrapper;
}> &
  IDestroyable;
