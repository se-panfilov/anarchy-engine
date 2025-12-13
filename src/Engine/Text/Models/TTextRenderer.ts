import type { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import type { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';

import type { TScreenSizeValues } from '@/Engine/Screen';
import type { TextRendererType } from '@/Engine/Text/Constants';

export type TTextRenderer<T extends CSS2DRenderer | CSS3DRenderer> = Readonly<{
  id: string;
  type: TextRendererType;
  renderer: T;
  destroy: () => void;
  updateSize: (size: TScreenSizeValues) => void;
}>;
