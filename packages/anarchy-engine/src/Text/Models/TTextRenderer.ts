import type { TDestroyable, TWithId } from '@hellpig/anarchy-engine/Mixins';
import type { TextRendererType } from '@hellpig/anarchy-engine/Text/Constants';
import type { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import type { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';

export type TTextRenderer<T extends CSS2DRenderer | CSS3DRenderer> = Readonly<{
  type: TextRendererType;
  renderer: T;
  updateSize: (size: DOMRect) => void;
}> &
  TWithId &
  TDestroyable;
