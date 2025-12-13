import type { IFactory, IActorParams, IMesh } from '@Engine/Models';
import type { IActorConfig } from '@Engine/Launcher/Models';
import type { IActorWrapper } from '@Engine/Wrappers/ActorWrapper';

export type IActorFactory = IFactory<IActorWrapper, IMesh, IActorParams, IActorConfig>;
