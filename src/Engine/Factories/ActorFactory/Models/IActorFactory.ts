import type { IActorParams, IFactory, IMesh } from '@Engine/Models';
import type { IActorConfig } from '@Engine/SceneLauncher/Models';
import type { IActorWrapper } from '@Engine/Wrappers/ActorWrapper';

export type IActorFactory = IFactory<IActorWrapper, IMesh, IActorParams, IActorConfig>;
