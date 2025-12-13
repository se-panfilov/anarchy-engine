import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { AbstractWrapper } from '@Engine/Wrappers/AbstractWrapper';
import type { CameraWrapper } from '@Engine/Wrappers/CameraWrapper';
import { isNotDefined } from '@Engine/Utils';
import type { RendererWrapper } from '@Engine/Wrappers/RendererWrapper';

export class ControlsWrapper extends AbstractWrapper<OrbitControls> {
  public entity: OrbitControls;

  constructor(camera: CameraWrapper, renderer: RendererWrapper) {
    super();

    if (isNotDefined(renderer.entity)) throw new Error('Renderer entity is not defined in ControlWrapper');
    if (isNotDefined(camera.entity)) throw new Error('Camera entity is not defined in ControlWrapper');

    this.entity = new OrbitControls(camera.entity, renderer.entity.domElement);
    this.entity.enableDamping = true;
  }
}
