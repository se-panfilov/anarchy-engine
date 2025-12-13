import type { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';

import type { ITextRenderer } from './ITextRenderer';

export type IText3dRenderer = Omit<ITextRenderer, 'renderer'> &
  Readonly<{
    renderer: CSS3DRenderer;
  }>;
