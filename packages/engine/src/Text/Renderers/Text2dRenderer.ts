import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';

import type { TContainerDecorator } from '@/Global';
import { TextCssClass, TextRendererType } from '@/Text/Constants';
import type { TText2dRenderer } from '@/Text/Models';

import { getTextRenderer } from './TextRendererBuilder';

export function initText2dRenderer(container: TContainerDecorator): TText2dRenderer {
  return getTextRenderer<CSS2DRenderer>(new CSS2DRenderer(), TextCssClass.RendererText2d, TextRendererType.Text2dRenderer, container);
}
