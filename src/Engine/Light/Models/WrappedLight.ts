import { AmbientLight, DirectionalLight } from 'three';
import type { Entity } from '@/Engine/Models';

export interface WrappedLight extends Entity {
  readonly light: AmbientLight | DirectionalLight;
}
