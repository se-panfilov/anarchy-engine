import type { TContainerDecorator } from '@hellpig/anarchy-engine/Global';
import { TextCssClass, TextRendererType } from '@hellpig/anarchy-engine/Text/Constants';
import type { TText2dRenderer } from '@hellpig/anarchy-engine/Text/Models';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';

import { getTextRenderer } from './TextRendererBuilder';

export function initText2dRenderer(container: TContainerDecorator): TText2dRenderer {
  return getTextRenderer<CSS2DRenderer>(new CSS2DRenderer(), TextCssClass.RendererText2d, TextRendererType.Text2dRenderer, container);
}
