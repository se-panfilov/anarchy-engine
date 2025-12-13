import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';

import type { TContainerDecorator } from '@/Global';
import { TextCssClass, TextRendererType } from '@/Text/Constants';
import type { TText3dRenderer } from '@/Text/Models';
import { getTextRenderer } from '@/Text/Renderers/TextRendererBuilder';

export function initText3dRenderer(container: TContainerDecorator): TText3dRenderer {
  return getTextRenderer(new CSS3DRenderer(), TextCssClass.RendererText3d, TextRendererType.Text3dRenderer, container);
}
