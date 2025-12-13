import type { Color, MeshBasicMaterial, MeshStandardMaterial } from 'three';

import type { TextTag } from '@/Engine/Domains/Text';
import type { IWithReadonlyTags } from '@/Engine/Mixins';
import type { IVector3Wrapper } from '@/Engine/Wrappers';

export type ITextParams = Readonly<{
  text: string;
  position: IVector3Wrapper;
  fontSize: number;
  color?: string | number | Color;
  font?: string;
  maxWidth?: number;
  lineHeight?: number;
  letterSpacing?: number;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  material?: MeshBasicMaterial | MeshStandardMaterial;
  anchorX?: 'left' | 'center' | 'right' | number;
  anchorY?: 'top' | 'middle' | 'bottom' | 'baseline' | number;
  clipRect?: [number, number, number, number];
  depthOffset?: number;
  direction?: 'auto' | 'ltr' | 'rtl';
  overflowWrap?: 'normal' | 'break-word';
  whiteSpace?: 'normal' | 'nowrap';
  outlineWidth?: number;
  outlineOffsetX?: number;
  outlineOffsetY?: number;
  outlineColor?: string | number;
  outlineOpacity?: number;
  strokeWidth?: number;
  strokeColor?: string | number | Color;
  strokeOpacity?: number;
  curveRadius?: number;
  fillOpacity?: number;
  fontStyle?: 'normal' | 'italic';
  fontWeight?: 'normal' | 'bold';
  glyphGeometryDetail?: number;
  gpuAccelerateSDF?: boolean;
  outlineBlur?: number;
  sdfGlyphSize?: number;
  textIndent?: number;
  unicodeFontsUrl?: string;
}> &
  IWithReadonlyTags<TextTag>;
