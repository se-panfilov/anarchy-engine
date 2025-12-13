import type { Side } from 'three/src/constants';
import { BackSide, DoubleSide, FrontSide } from 'three/src/constants';

import { SideName } from './SideName';

export const SideMap: Readonly<Record<SideName, Side>> = {
  [SideName.FrontSide]: FrontSide,
  [SideName.BackSide]: BackSide,
  [SideName.DoubleSide]: DoubleSide
};
