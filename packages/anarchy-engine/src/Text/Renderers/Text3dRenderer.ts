import type { TContainerDecorator } from '@hellpig/anarchy-engine/Global';
import { TextCssClass, TextRendererType } from '@hellpig/anarchy-engine/Text/Constants';
import type { TText3dRenderer } from '@hellpig/anarchy-engine/Text/Models';
import { getTextRenderer } from '@hellpig/anarchy-engine/Text/Renderers/TextRendererBuilder';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';

export function initText3dRenderer(container: TContainerDecorator): TText3dRenderer {
  return getTextRenderer(new CSS3DRenderer(), TextCssClass.RendererText3d, TextRendererType.Text3dRenderer, container);
}
