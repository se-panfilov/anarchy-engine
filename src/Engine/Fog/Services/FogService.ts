import { Fog } from 'three';

export function FogService() {
  function createFog() {
    return new Fog(0x000000, 0.015, 100);
  }
}
