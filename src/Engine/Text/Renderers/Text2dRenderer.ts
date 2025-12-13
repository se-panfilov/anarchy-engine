import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';

import type { TAppGlobalContainer } from '@/Engine/Global';
import type { TScreenSizeWatcher } from '@/Engine/Screen';
import { TextCssClass, TextRendererType } from '@/Engine/Text/Constants';
import type { TText2dRenderer } from '@/Engine/Text/Models';

import { getTextRenderer } from './TextRendererBuilder';

export function initText2dRenderer(container: TAppGlobalContainer, screenSizeWatcher: Readonly<TScreenSizeWatcher>): TText2dRenderer {
  return getTextRenderer<CSS2DRenderer>(new CSS2DRenderer(), TextCssClass.RendererText2d, TextRendererType.Text2dRenderer, container, screenSizeWatcher);
}
