import type { Mesh, Vector3 } from 'three';

export interface Accessors {
  readonly setPosition: (x: number, y: number, z: number) => Vector3;
  readonly setCastShadow: (value: boolean) => boolean;
}

export function getAccessors(entity: Mesh): Accessors {
  const setPosition = (x: number, y: number, z: number): Vector3 => entity.position.set(x, y, z);
  // eslint-disable-next-line functional/immutable-data
  const setCastShadow = (value: boolean): boolean => (entity.castShadow = value);

  return { setPosition, setCastShadow };
}
