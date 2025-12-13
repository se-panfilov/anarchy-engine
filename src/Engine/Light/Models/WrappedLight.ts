import { AmbientLight, DirectionalLight } from 'three';
import type { Entity } from '@/Engine/Models';

export interface WrappedLight extends Entity {
  readonly light: AmbientLight | DirectionalLight;
}

export interface WrappedAmbientLight extends WrappedLight {
  readonly light: AmbientLight;
}

export interface WrappedDirectionalLight extends WrappedLight {
  readonly light: DirectionalLight;
}
