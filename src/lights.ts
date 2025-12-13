// Lights
import { AmbientLight, DirectionalLight } from 'three';
import { pane } from './DeveloperPanel';

export const ambientLight = new AmbientLight(0xffffff, 0.5);

export const directionalLight = new DirectionalLight('#ffffff', 1);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.normalBias = 0.05;
directionalLight.position.set(0.25, 2, 2.25);

const lightPane = pane.addFolder({
  title: 'Light Position',
  expanded: true
});

lightPane.addInput(directionalLight.position, 'x', { min: 0, max: 100, step: 1 });
lightPane.addInput(directionalLight.position, 'y', { min: 0, max: 100, step: 1 });
lightPane.addInput(directionalLight.position, 'z', { min: 0, max: 100, step: 1 });
