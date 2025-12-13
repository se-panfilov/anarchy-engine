import type { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import type { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';

import type { TDestroyable, TWithId } from '@/Engine/Mixins';
import type { TextRendererType } from '@/Engine/Text/Constants';

export type TTextRenderer<T extends CSS2DRenderer | CSS3DRenderer> = Readonly<{
  type: TextRendererType;
  renderer: T;
  updateSize: (size: DOMRect) => void;
}> &
  TWithId &
  TDestroyable;
