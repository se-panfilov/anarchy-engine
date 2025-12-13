import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';

import type { IAppGlobalContainer } from '@/Engine/Domains/Global';

export function init2dTextRenderer(container: IAppGlobalContainer): CSS2DRenderer {
  const renderer: CSS2DRenderer = new CSS2DRenderer();
  renderer.setSize(container.innerWidth, container.innerHeight);
  // eslint-disable-next-line functional/immutable-data
  renderer.domElement.style.position = 'absolute';
  // eslint-disable-next-line functional/immutable-data
  renderer.domElement.style.top = '0';
  // eslint-disable-next-line functional/immutable-data
  renderer.domElement.style.pointerEvents = 'none';
  container.document.body.appendChild(renderer.domElement);
  return renderer;
}
