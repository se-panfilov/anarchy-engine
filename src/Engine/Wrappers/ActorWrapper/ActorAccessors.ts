import { Mesh } from 'three';

export interface ActorAccessors {
  readonly setPosition: (x: number, y: number, z: number) => void;
  readonly setCastShadow: (value: boolean) => void;
}

export function getActorAccessors(entity: Mesh): ActorAccessors {
  function setPosition(x: number, y: number, z: number): void {
    entity.position.set(x, y, z);
  }

  function setCastShadow(value: boolean): void {
    // eslint-disable-next-line functional/immutable-data
    entity.castShadow = value;
  }

  return { setPosition, setCastShadow };
}
