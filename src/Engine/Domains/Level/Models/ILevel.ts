import type { ILoopFactory, ILoopRegistry, ILoopWrapper } from '@Engine/Domains/Loop';
import type { Subject } from 'rxjs';

import type { IActorFactory, IActorRegistry } from '@/Engine/Domains/Actor';
import type { ICameraFactory, ICameraRegistry } from '@/Engine/Domains/Camera';
import type { IControlsFactory, IControlsRegistry } from '@/Engine/Domains/Controls';
import type { LevelTag } from '@/Engine/Domains/Level';
import type { ILightFactory, ILightRegistry } from '@/Engine/Domains/Light';
import type { IReactiveDestroyable } from '@/Engine/Domains/Mixins';
import type { IRendererFactory, IRendererRegistry } from '@/Engine/Domains/Renderer';
import type { ISceneFactory, ISceneRegistry } from '@/Engine/Domains/Scene';

export type ILevel = IReactiveDestroyable &
  Readonly<{
    name: string;
    start: () => ILoopWrapper;
    built$: Subject<void>;
    actor: DomainTools<IActorFactory, IActorRegistry>;
    camera: DomainTools<ICameraFactory, ICameraRegistry>;
    light: DomainTools<ILightFactory, ILightRegistry>;
    controls: DomainTools<IControlsFactory, IControlsRegistry>;
    loop: DomainTools<ILoopFactory, ILoopRegistry>;
    scenes: DomainTools<ISceneFactory, ISceneRegistry>;
    renderer: DomainTools<IRendererFactory, IRendererRegistry>;
    tags: ReadonlyArray<LevelTag>;
  }>;

export type DomainTools<F, R> = {
  factory: { initial: F } & Record<string, F>;
  registry: { initial: R } & Record<string, R>;
};
