import type { Side } from 'three';
import { BackSide, DoubleSide, FrontSide } from 'three';

import { SideName } from './SideName';

export const SideMap: Readonly<Record<SideName, Side>> = {
  [SideName.BackSide]: BackSide,
  [SideName.DoubleSide]: DoubleSide,
  [SideName.FrontSide]: FrontSide
};
