import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';

import type { IAppGlobalContainer } from '@/Engine/Domains/Global';
import type { IScreenSizeWatcher } from '@/Engine/Domains/Screen';
import { TextCssClass } from '@/Engine/Domains/Text/Constants';
import type { IText3dRenderer } from '@/Engine/Domains/Text/Models';
import { getTextRenderer } from '@/Engine/Domains/Text/Renderer/TextRendererBuilder';

export function initText3dRenderer(container: IAppGlobalContainer, screenSizeWatcher: Readonly<IScreenSizeWatcher>): IText3dRenderer {
  return getTextRenderer(new CSS3DRenderer(), TextCssClass.RendererText3d, container, screenSizeWatcher);
}
