import type { Subscription } from 'rxjs';

import type { IAppCanvas } from '@/Engine/App';
import type { IRendererFactory, IRendererRegistry, IRendererWrapper } from '@/Engine/Renderer';
import { RendererFactory, RendererModes, RendererRegistry, RendererTag } from '@/Engine/Renderer';

export function initRenderersEntityPipe(canvas: IAppCanvas): { renderer: IRendererWrapper; rendererCreated$: Subscription; rendererFactory: IRendererFactory; rendererRegistry: IRendererRegistry } {
  const rendererFactory: IRendererFactory = RendererFactory();
  const rendererRegistry: IRendererRegistry = RendererRegistry();
  const rendererCreated$: Subscription = rendererFactory.entityCreated$.subscribe((wrapper: IRendererWrapper): void => rendererRegistry.add(wrapper));
  const renderer: IRendererWrapper = rendererFactory.create({ canvas, tags: [RendererTag.Main], mode: RendererModes.WebGL2 });

  return { renderer, rendererCreated$, rendererFactory, rendererRegistry };
}
