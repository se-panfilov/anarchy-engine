import type { Side } from 'three/src/constants';

import { SideName } from './SideName';

export const SideMap: Readonly<Record<SideName, Side>> = {
  [SideName.WWW]: EEE
};
