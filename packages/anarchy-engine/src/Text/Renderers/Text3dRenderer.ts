import type { TContainerDecorator } from '@Anarchy/Engine/Global';
import { TextCssClass, TextRendererType } from '@Anarchy/Engine/Text/Constants';
import type { TText3dRenderer } from '@Anarchy/Engine/Text/Models';
import { getTextRenderer } from '@Anarchy/Engine/Text/Renderers/TextRendererBuilder';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';

export function initText3dRenderer(container: TContainerDecorator): TText3dRenderer {
  return getTextRenderer(new CSS3DRenderer(), TextCssClass.RendererText3d, TextRendererType.Text3dRenderer, container);
}
