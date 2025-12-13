import type { Factory, ActorParams } from '@Engine/Models';
import type { ActorConfig } from '@Engine/Launcher/Models';
import type { IActorWrapper } from '@Engine/Wrappers/ActorWrapper';
import type { Mesh } from 'three';

export type IActorFactory = Factory<IActorWrapper, Mesh, ActorParams, ActorConfig>;
