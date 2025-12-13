import type { Color, MeshBasicMaterial, MeshStandardMaterial } from 'three';

import type { TextAlign, TextAnchorX, TextAnchorY, TextDirection, TextFontStyle, TextFontWeight, TextOverflowWrap, TextTag, TextWhiteSpace } from '@/Engine/Domains/Text';
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
  textAlign?: TextAlign;
  material?: MeshBasicMaterial | MeshStandardMaterial;
  anchorX?: TextAnchorX | number;
  anchorY?: TextAnchorY | number;
  clipRect?: [number, number, number, number];
  depthOffset?: number;
  direction?: TextDirection;
  overflowWrap?: TextOverflowWrap;
  whiteSpace?: TextWhiteSpace;
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
  fontStyle?: TextFontStyle;
  fontWeight?: TextFontWeight;
  glyphGeometryDetail?: number;
  gpuAccelerateSDF?: boolean;
  outlineBlur?: number;
  sdfGlyphSize?: number;
  textIndent?: number;
  unicodeFontsUrl?: string;
}> &
  IWithReadonlyTags<TextTag>;
