import { Mesh, MeshToonMaterial, PlaneGeometry, SphereGeometry } from 'three';
import { AbstractWrapper } from '@Engine/Wrappers/AbstractWrapper';
import type { ActorParams } from '@Engine/Models/ActorParams';

export class ActorWrapper extends AbstractWrapper<Mesh> {
  public entity: Mesh;

  constructor(params: ActorParams) {
    super();
    this.entity = createActor(params);
  }

  setPosition(x: number, y: number, z: number): void {
    this.entity.position.set(x, y, z);
  }

  setCastShadow(value: boolean): void {
    // eslint-disable-next-line functional/immutable-data
    this.entity.castShadow = value;
  }
}

function createActor(params: ActorParams): Mesh {
  if (params.type === 'plane') return createPlane(params);
  if (params.type === 'sphere') return createSphere(params);
  throw new Error('Cannot create Actor: unknown actor type');
}

function createPlane({ width, height, widthSegments, heightSegments, materialParams }: ActorParams): Mesh {
  const plane = new Mesh(
    new PlaneGeometry(width, height, widthSegments, heightSegments),
    new MeshToonMaterial(materialParams)
  );
  plane.rotation.set(-Math.PI / 2, 0, 0);
  // eslint-disable-next-line functional/immutable-data
  plane.receiveShadow = true;

  return plane;
}

function createSphere({ radius, widthSegments, heightSegments, materialParams }: ActorParams): Mesh {
  // const sphere = new Mesh(new SphereGeometry(1, 32, 32), new MeshToonMaterial({ color: new Color('#5EDCAE') }));
  const sphere = new Mesh(
    new SphereGeometry(radius, widthSegments, heightSegments),
    new MeshToonMaterial(materialParams)
  );
  sphere.position.set(0, 2, 0);
  // eslint-disable-next-line functional/immutable-data
  sphere.castShadow = true;

  return sphere;
}
