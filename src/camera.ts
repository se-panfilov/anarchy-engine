import { PerspectiveCamera } from 'three';

const VERTICAL_FIELD_OF_VIEW = 45;

export const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

export const camera = new PerspectiveCamera(VERTICAL_FIELD_OF_VIEW, sizes.width / sizes.height, 1, 10000);

camera.position.set(3, 2, 15);
camera.lookAt(0, 0, 0);

// const cameraPosPane = pane.addFolder({
//   title: 'Camera Position',
//   expanded: true
// });
//
// cameraPosPane.addInput(camera.position, 'x', { min: 0, max: 100, step: 1 });
// cameraPosPane.addInput(camera.position, 'y', { min: 0, max: 100, step: 1 });
// cameraPosPane.addInput(camera.position, 'z', { min: 0, max: 100, step: 1 });

// const cameraRotationPane = pane.addFolder({
//   title: 'Camera Rotation',
//   expanded: true
// });
//
// cameraRotationPane.addInput(camera.rotation, 'x', { min: 0, max: 360, step: 0.1 });
// cameraRotationPane.addInput(camera.rotation, 'y', { min: 0, max: 360, step: 0.1 });
// cameraRotationPane.addInput(camera.rotation, 'z', { min: 0, max: 360, step: 0.1 });

// cameraPosPane.addInput(camera, 'fov', { min: 0, max: 2000, step: 1 });
