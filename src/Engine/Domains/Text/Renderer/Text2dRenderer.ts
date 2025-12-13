import { nanoid } from 'nanoid';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';

import type { IAppGlobalContainer } from '@/Engine/Domains/Global';
import type { IScreenSizeValues, IScreenSizeWatcher } from '@/Engine/Domains/Screen';
import { RelatedEntityAttribute, Text2dCssClass } from '@/Engine/Domains/Text/Constants';
import type { IText2dRenderer } from '@/Engine/Domains/Text/Models';

export function initText2dRenderer(container: IAppGlobalContainer, screenSizeWatcher: Readonly<IScreenSizeWatcher>): IText2dRenderer {
  const renderer: CSS2DRenderer = new CSS2DRenderer();
  const id: string = nanoid();
  renderer.setSize(container.innerWidth, container.innerHeight);
  // eslint-disable-next-line functional/immutable-data
  renderer.domElement.style.position = 'absolute';
  // eslint-disable-next-line functional/immutable-data
  renderer.domElement.style.top = '0';
  // eslint-disable-next-line functional/immutable-data
  renderer.domElement.style.pointerEvents = 'none';
  // eslint-disable-next-line functional/immutable-data
  renderer.domElement.className = Text2dCssClass.RendererText2d;
  renderer.domElement.setAttribute(RelatedEntityAttribute, id);
  container.document.body.appendChild(renderer.domElement);

  function updateSize({ width, height }: IScreenSizeValues): void {
    renderer.setSize(width, height);
  }

  //init with the values which came before the start of the subscription
  updateSize(screenSizeWatcher.latest$.value);

  screenSizeWatcher.value$.subscribe(updateSize);

  function destroy(): void {
    screenSizeWatcher.value$.unsubscribe();
    renderer.domElement.remove();
  }

  return { renderer, destroy, updateSize };
}
