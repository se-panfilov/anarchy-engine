import type { Observable } from 'rxjs';

import type { IDestroyable, IWithMessages, IWithTags } from '@/Engine/Mixins';
import type { ISpaceFactories, ISpaceRegistries, ISpaceRenderer, ISpaceServices, IWithBuilt } from '@/Engine/Space';

export type ISpace = IDestroyable &
  IWithMessages &
  Omit<IWithBuilt, 'built$'> &
  IWithTags<string> &
  Readonly<{
    name: string;
    start: () => void;
    stop: () => void;
    factories: ISpaceFactories;
    registries: ISpaceRegistries;
    services: ISpaceServices;
    renderers: ISpaceRenderer;
    built$: Observable<void>;
    isBuilt: () => boolean;
  }>;
