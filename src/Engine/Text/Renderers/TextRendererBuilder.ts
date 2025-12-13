import { nanoid } from 'nanoid';
import type { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs';
import type { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import type { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';

import type { TAppGlobalContainer, TContainerDecorator } from '@/Engine/Global';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TScreenSizeValues, TScreenSizeWatcher } from '@/Engine/Screen';
import type { TextCssClass, TextRendererType } from '@/Engine/Text/Constants';
import { RelatedEntityAttribute } from '@/Engine/Text/Constants';
import type { TTextRenderer } from '@/Engine/Text/Models';
import { isAppGlobalContainer } from '@/Engine/Utils';

export function getTextRenderer<T extends CSS2DRenderer | CSS3DRenderer>(
  renderer: T,
  cssClass: TextCssClass,
  type: TextRendererType,
  container: TAppGlobalContainer | TContainerDecorator,
  screenSizeWatcher: Readonly<TScreenSizeWatcher>
): TTextRenderer<T> {
  const id: string = 'text_renderer_' + nanoid();

  if (isAppGlobalContainer(container)) {
    renderer.setSize(container.innerWidth, container.innerHeight);
  } else {
    renderer.setSize(container.getWidth(), container.getHeight());
  }

  // eslint-disable-next-line functional/immutable-data
  renderer.domElement.style.position = 'absolute';
  // eslint-disable-next-line functional/immutable-data
  renderer.domElement.style.top = '0';
  // eslint-disable-next-line functional/immutable-data
  renderer.domElement.style.pointerEvents = 'none';
  // eslint-disable-next-line functional/immutable-data
  renderer.domElement.className = cssClass;
  renderer.domElement.setAttribute(RelatedEntityAttribute, id);
  if (isAppGlobalContainer(container)) {
    container.document.body.appendChild(renderer.domElement);
  } else {
    (container.getElement() as HTMLElement)?.appendChild(renderer.domElement);
  }

  const updateSize = ({ width, height }: TScreenSizeValues): void => renderer.setSize(width, height);

  //init with the values which came before the start of the subscription
  updateSize(screenSizeWatcher.getValue());

  const screenSize$: Subscription = screenSizeWatcher.value$
    .pipe(distinctUntilChanged((prev: TScreenSizeValues, curr: TScreenSizeValues): boolean => prev.width === curr.width && prev.height === curr.height))
    .subscribe(updateSize);

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    screenSize$.unsubscribe();

    if (isAppGlobalContainer(container)) {
      container.document.body.removeChild(renderer.domElement);
    } else {
      (container.getElement() as HTMLElement)?.removeChild(renderer.domElement);
    }

    renderer.domElement.remove();
    // eslint-disable-next-line functional/immutable-data
    renderer.domElement = null as any;
  });

  return { id, type, renderer, updateSize, ...destroyable };
}
