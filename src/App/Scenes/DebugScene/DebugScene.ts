import { Mesh, MeshToonMaterial, PlaneGeometry } from 'three';

// TODO (S.Panfilov) CWP maybe make a wrapper entity for scenes, light and "actors"? Also need better clicks and "shooting" mechanic
export const plane = new Mesh(new PlaneGeometry(60, 40, 10, 10), new MeshToonMaterial({ color: '#444' }));
plane.rotation.set(-Math.PI / 2, 0, 0);
plane.receiveShadow = true;
