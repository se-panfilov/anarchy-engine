import type { Entity } from '@/Engine/Models';
import { PerspectiveCamera } from 'three';

export interface WrappedCamera extends Entity {
  readonly camera: PerspectiveCamera;
  readonly setPosition: (x: number, y: number, z: number) => void;
  readonly lookAt: (x: number, y: number, z: number) => void;
}
