import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';

import type { IAppGlobalContainer } from '@/Engine/Global';
import type { TScreenSizeWatcher } from '@/Engine/Screen';
import { TextCssClass, TextRendererType } from '@/Engine/Text/Constants';
import type { IText2dRenderer } from '@/Engine/Text/Models';

import { getTextRenderer } from './TextRendererBuilder';

export function initText2dRenderer(container: IAppGlobalContainer, screenSizeWatcher: Readonly<TScreenSizeWatcher>): IText2dRenderer {
  return getTextRenderer<CSS2DRenderer>(new CSS2DRenderer(), TextCssClass.RendererText2d, TextRendererType.Text2dRenderer, container, screenSizeWatcher);
}
