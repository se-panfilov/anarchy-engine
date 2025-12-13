import type { Entity } from '@Engine/Models';
import type { Mesh } from 'three';

export interface WrappedActor extends Entity {
  readonly actor: Mesh;
}
