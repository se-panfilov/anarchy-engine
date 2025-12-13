import type { Color } from 'three';

export type IFogProps = Readonly<{
  color: Color;
  near?: number;
  far?: number;
}>;
