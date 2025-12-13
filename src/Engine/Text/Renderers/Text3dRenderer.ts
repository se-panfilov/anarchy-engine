import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';

import type { TContainerDecorator } from '@/Engine/Global';
import { TextCssClass, TextRendererType } from '@/Engine/Text/Constants';
import type { TText3dRenderer } from '@/Engine/Text/Models';
import { getTextRenderer } from '@/Engine/Text/Renderers/TextRendererBuilder';

export function initText3dRenderer(container: TContainerDecorator): TText3dRenderer {
  return getTextRenderer(new CSS3DRenderer(), TextCssClass.RendererText3d, TextRendererType.Text3dRenderer, container);
}
