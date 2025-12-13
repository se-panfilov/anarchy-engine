import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';

import type { IAppGlobalContainer } from '@/Engine/Domains/Global';
import type { IScreenSizeWatcher } from '@/Engine/Domains/Screen';
import { TextCssClass } from '@/Engine/Domains/Text/Constants';
import type { IText2dRenderer } from '@/Engine/Domains/Text/Models';

import { getTextRenderer } from './TextRendererBuilder';

export function initText2dRenderer(container: IAppGlobalContainer, screenSizeWatcher: Readonly<IScreenSizeWatcher>): IText2dRenderer {
  return getTextRenderer<CSS2DRenderer>(new CSS2DRenderer(), TextCssClass.RendererText2d, container, screenSizeWatcher);
}
