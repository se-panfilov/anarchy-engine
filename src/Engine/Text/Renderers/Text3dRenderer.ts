import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';

import type { TAppGlobalContainer, TContainerDecorator } from '@/Engine/Global';
import type { TScreenSizeWatcher } from '@/Engine/Screen';
import { TextCssClass, TextRendererType } from '@/Engine/Text/Constants';
import type { TText3dRenderer } from '@/Engine/Text/Models';
import { getTextRenderer } from '@/Engine/Text/Renderers/TextRendererBuilder';

export function initText3dRenderer(container: TAppGlobalContainer | TContainerDecorator, screenSizeWatcher: Readonly<TScreenSizeWatcher>): TText3dRenderer {
  return getTextRenderer(new CSS3DRenderer(), TextCssClass.RendererText3d, TextRendererType.Text3dRenderer, container, screenSizeWatcher);
}
