import { Mesh, MeshToonMaterial, PlaneGeometry } from 'three';

export const plane = new Mesh(new PlaneGeometry(10, 10, 10, 10), new MeshToonMaterial({ color: '#444' }));
plane.rotation.set(-Math.PI / 2, 0, 0);
plane.receiveShadow = true;
