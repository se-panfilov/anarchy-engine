import type { ILoopFactory, ILoopRegistry, ILoopWrapper } from '@Engine/Domains/Loop';
import type { Observable } from 'rxjs';

import type { CommonTag } from '@/Engine/Domains/Abstract';
import type { IActorFactory, IActorRegistry } from '@/Engine/Domains/Actor';
import type { ICameraFactory, ICameraRegistry } from '@/Engine/Domains/Camera';
import type { IControlsFactory, IControlsRegistry } from '@/Engine/Domains/Controls';
import type { IIntersectionsWatcherFactory, IIntersectionsWatcherRegistry } from '@/Engine/Domains/Intersections';
import type { LevelTag } from '@/Engine/Domains/Level';
import type { ILightFactory, ILightRegistry } from '@/Engine/Domains/Light';
import type { IDestroyable } from '@/Engine/Domains/Mixins';
import type { IRendererFactory, IRendererRegistry } from '@/Engine/Domains/Renderer';
import type { ISceneFactory, ISceneRegistry } from '@/Engine/Domains/Scene';

export type ILevel = IDestroyable &
  Readonly<{
    name: string;
    start: () => ILoopWrapper;
    stop: () => void;
    actor: DomainTools<IActorFactory, IActorRegistry>;
    camera: DomainTools<ICameraFactory, ICameraRegistry>;
    light: DomainTools<ILightFactory, ILightRegistry>;
    controls: DomainTools<IControlsFactory, IControlsRegistry>;
    intersectionsWatcher: DomainTools<IIntersectionsWatcherFactory, IIntersectionsWatcherRegistry>;
    loop: DomainTools<ILoopFactory, ILoopRegistry>;
    scenes: DomainTools<ISceneFactory, ISceneRegistry>;
    renderer: DomainTools<IRendererFactory, IRendererRegistry>;
    tags: ReadonlyArray<LevelTag | CommonTag | string>;
    built$: Observable<void>;
    isBuilt: () => boolean;
  }>;

export type DomainTools<F, R> = {
  factory: { initial: F } & Record<string, F>;
  registry: { initial: R } & Record<string, R>;
};
