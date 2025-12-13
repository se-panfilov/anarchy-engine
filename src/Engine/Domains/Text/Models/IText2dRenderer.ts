import type { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';

import type { IScreenSizeValues } from '@/Engine';

export type IText2dRenderer = {
  renderer: CSS2DRenderer;
  destroy: () => void;
  updateSize: (size: IScreenSizeValues) => void;
};
