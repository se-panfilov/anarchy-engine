import type { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';

import type { IScreenSizeValues } from '@/Engine/Domains/Screen';

export type IText2dRenderer = {
  renderer: CSS2DRenderer;
  destroy: () => void;
  updateSize: (size: IScreenSizeValues) => void;
};
