import { PerspectiveCamera } from 'three';

const VERTICAL_FIELD_OF_VIEW = 45;

export const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

export const camera = new PerspectiveCamera(VERTICAL_FIELD_OF_VIEW, sizes.width / sizes.height);

camera.position.set(3, 2, 15);
