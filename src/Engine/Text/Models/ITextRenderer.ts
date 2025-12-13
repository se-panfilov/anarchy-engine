import type { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import type { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';

import type { IScreenSizeValues } from '@/Engine/Screen';

export type ITextRenderer<T extends CSS2DRenderer | CSS3DRenderer> = {
  renderer: T;
  destroy: () => void;
  updateSize: (size: IScreenSizeValues) => void;
};
