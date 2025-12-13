import type { TWrapper } from '@/Engine/Abstract';
import type { IMovable3dXYZ, IRotatable, IWithActiveMixin, IWithObject3d, IWithTagsMixin } from '@/Engine/Mixins';

import type { ICamera } from './ICamera';
import type { ICameraAccessors } from './ICameraAccessors';

export type ICameraWrapper = TWrapper<ICamera> & IWithObject3d & IWithActiveMixin & ICameraAccessors & IMovable3dXYZ & IRotatable & IWithTagsMixin;
