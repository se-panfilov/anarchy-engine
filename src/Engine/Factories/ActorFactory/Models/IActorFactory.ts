import type { Factory, ActorParams } from '@Engine/Models';
import type { IActorWrapper } from '@Engine/Wrappers';
import type { Mesh } from 'three';

export type IActorFactory = Factory<IActorWrapper, Mesh, ActorParams>;
