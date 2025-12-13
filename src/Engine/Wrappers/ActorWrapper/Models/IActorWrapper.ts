import type { Mesh } from 'three';
import type { IWrapper } from '@Engine/Models';
import type { IActorAccessors } from '@Engine/Wrappers';

export type IActorWrapper = IWrapper<Mesh> & IActorAccessors;
