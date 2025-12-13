import type { IFactory, IActorParams } from '@Engine/Models';
import type { ActorConfig } from '@Engine/Launcher/Models';
import type { IActorWrapper } from '@Engine/Wrappers/ActorWrapper';
import type { Mesh } from 'three';

export type IActorFactory = IFactory<IActorWrapper, Mesh, IActorParams, ActorConfig>;
