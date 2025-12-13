import type { PerspectiveCamera, Vector3 } from 'three';

export interface Accessors {
  readonly setPosition: (x: number, y: number, z: number) => Vector3;
  readonly setCastShadow: (value: boolean) => boolean;
  readonly setControls: (x: number, y: number, z: number) => Vector3;
}

export function getAccessors(entity: PerspectiveCamera): Accessors {
  const setPosition = (x: number, y: number, z: number): Vector3 => entity.position.set(x, y, z);
  // eslint-disable-next-line functional/immutable-data
  const setCastShadow = (value: boolean): boolean => (entity.castShadow = value);
  const setControls = (x: number, y: number, z: number): Vector3 => entity.position.set(x, y, z);

  return { setPosition, setCastShadow, setControls };
}
