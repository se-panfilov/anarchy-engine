import type { TDestroyable } from '@/Engine/Mixins';

import type { TKinematicData } from './TKinematicData';
import type { TKinematicMethods } from './TKinematicMethods';

export type TKinematicFields = {
  data: TKinematicData;
} & TKinematicMethods &
  TDestroyable;
