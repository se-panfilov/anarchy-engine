import type { TWrapper } from '@/Engine/Abstract';

import type { TEuler } from './TEuler';
import type { TEulerWithX } from './TEulerWithX';
import type { TEulerWithY } from './TEulerWithY';
import type { TEulerWithZ } from './TEulerWithZ';

export type TEulerWrapper = TWrapper<TEuler> & TEulerWithX & TEulerWithY & TEulerWithZ;
