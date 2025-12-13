import { Color, Mesh, MeshToonMaterial, SphereGeometry } from 'three';

export const sphere = new Mesh(new SphereGeometry(1, 32, 32), new MeshToonMaterial({ color: new Color('#5EDCAE') }));

sphere.position.set(0, 2, 0);
sphere.castShadow = true;
