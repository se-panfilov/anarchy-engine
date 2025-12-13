import { nanoid } from 'nanoid';
import type { Subscription } from 'rxjs';
import type { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import type { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';

import type { IAppGlobalContainer } from '@/Engine/Global';
import type { IScreenSizeValues, IScreenSizeWatcher } from '@/Engine/Screen';
import type { TextCssClass } from '@/Engine/Text/Constants';
import { RelatedEntityAttribute } from '@/Engine/Text/Constants';
import type { ITextRenderer } from '@/Engine/Text/Models';

export function getTextRenderer<T extends CSS2DRenderer | CSS3DRenderer>(
  renderer: T,
  cssClass: TextCssClass,
  container: IAppGlobalContainer,
  screenSizeWatcher: Readonly<IScreenSizeWatcher>
): ITextRenderer<T> {
  const id: string = nanoid();
  renderer.setSize(container.innerWidth, container.innerHeight);
  // eslint-disable-next-line functional/immutable-data
  renderer.domElement.style.position = 'absolute';
  // eslint-disable-next-line functional/immutable-data
  renderer.domElement.style.top = '0';
  // eslint-disable-next-line functional/immutable-data
  renderer.domElement.style.pointerEvents = 'none';
  // eslint-disable-next-line functional/immutable-data
  renderer.domElement.className = cssClass;
  renderer.domElement.setAttribute(RelatedEntityAttribute, id);
  container.document.body.appendChild(renderer.domElement);

  const updateSize = ({ width, height }: IScreenSizeValues): void => renderer.setSize(width, height);

  //init with the values which came before the start of the subscription
  updateSize(screenSizeWatcher.latest$.value);

  const screenSize$: Subscription = screenSizeWatcher.value$.subscribe(updateSize);

  function destroy(): void {
    screenSize$.unsubscribe();
    renderer.domElement.remove();
  }

  return { renderer, destroy, updateSize };
}
