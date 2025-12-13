import type { Entity } from '@/Engine/Models';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export interface WrappedControl extends Entity {
  readonly control: OrbitControls;
}
