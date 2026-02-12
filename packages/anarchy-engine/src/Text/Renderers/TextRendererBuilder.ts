import type { TContainerDecorator } from '@Anarchy/Engine/Global';
import type { TDestroyable } from '@Anarchy/Engine/Mixins';
import { destroyableMixin } from '@Anarchy/Engine/Mixins';
import type { TextCssClass, TextRendererType } from '@Anarchy/Engine/Text/Constants';
import { RelatedEntityAttribute } from '@Anarchy/Engine/Text/Constants';
import type { TTextRenderer } from '@Anarchy/Engine/Text/Models';
import { isAppGlobalContainer } from '@Anarchy/Engine/Utils';
import { nanoid } from 'nanoid';
import type { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs';
import type { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import type { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';

export function getTextRenderer<T extends CSS2DRenderer | CSS3DRenderer>(renderer: T, cssClass: TextCssClass, type: TextRendererType, container: TContainerDecorator): TTextRenderer<T> {
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

  const updateSize = ({ width, height }: DOMRect): void => renderer.setSize(width, height);

  //init with the values which came before the start of the subscription
  // updateSize( container.resize$);

  const screenSize$: Subscription = container.resize$
    .pipe(distinctUntilChanged((prev: DOMRect, curr: DOMRect): boolean => prev.width === curr.width && prev.height === curr.height))
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
