import type { IWrapper } from '@/Engine/Abstract';

import type { IEuler } from './IEuler';
import type { IEulerWithX } from './IEulerWithX';
import type { IEulerWithY } from './IEulerWithY';
import type { IEulerWithZ } from './IEulerWithZ';

export type IEulerWrapper = IWrapper<IEuler> & IEulerWithX & IEulerWithY & IEulerWithZ;
