import { Entity } from '@/Models';
import { PerspectiveCamera } from 'three';

export interface WrappedCamera extends Entity {
  readonly camera: PerspectiveCamera;
}
