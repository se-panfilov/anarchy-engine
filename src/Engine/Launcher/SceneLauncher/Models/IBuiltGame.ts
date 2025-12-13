import type { ILoopFactory, ILoopRegistry, ILoopWrapper } from '@Engine/Domains/Loop';
import type { Subject } from 'rxjs';

import type { IActorFactory, IActorRegistry } from '@/Engine/Domains/Actor';
import type { ICameraFactory, ICameraRegistry } from '@/Engine/Domains/Camera';
import type { IControlsFactory, IControlsRegistry } from '@/Engine/Domains/Controls';
import type { ILightFactory, ILightRegistry } from '@/Engine/Domains/Light';
import type { IReactiveDestroyable } from '@/Engine/Domains/Mixins';
import type { IRendererFactory, IRendererRegistry } from '@/Engine/Domains/Renderer';

export type IBuiltGame = IReactiveDestroyable &
  Readonly<{
    start: () => ILoopWrapper;
    built$: Subject<void>;
    actor: DomainTools<IActorFactory, IActorRegistry>;
    camera: DomainTools<ICameraFactory, ICameraRegistry>;
    light: DomainTools<ILightFactory, ILightRegistry>;
    controls: DomainTools<IControlsFactory, IControlsRegistry>;
    loop: DomainTools<ILoopFactory, ILoopRegistry>;
    renderer: DomainTools<IRendererFactory, IRendererRegistry>;
  }>;

export type DomainTools<F, R> = {
  factory: { initial: F } & Record<string, F>;
  registry: { initial: R } & Record<string, R>;
};
