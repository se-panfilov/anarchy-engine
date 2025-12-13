import type { AbstractWrapper } from '@Engine/Wrappers';
import type { Mesh } from 'three';
import type { getAccessors } from '../Accessors';

export type IActorWrapper = ReturnType<typeof AbstractWrapper<Mesh>> & ReturnType<typeof getAccessors>;
