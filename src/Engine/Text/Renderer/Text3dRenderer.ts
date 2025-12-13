import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';

import type { IAppGlobalContainer } from '@/Engine/Global';
import type { IScreenSizeWatcher } from '@/Engine/Screen';
import { TextCssClass } from '@/Engine/Text/Constants';
import type { IText3dRenderer } from '@/Engine/Text/Models';
import { getTextRenderer } from '@/Engine/Text/Renderer/TextRendererBuilder';

export function initText3dRenderer(container: IAppGlobalContainer, screenSizeWatcher: Readonly<IScreenSizeWatcher>): IText3dRenderer {
  return getTextRenderer(new CSS3DRenderer(), TextCssClass.RendererText3d, container, screenSizeWatcher);
}
