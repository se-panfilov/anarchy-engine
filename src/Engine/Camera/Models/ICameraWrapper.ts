import type { IWrapper } from '@/Engine/Abstract';
import type { IMovable3dXYZ, IRotatable, IWithActiveMixin, IWithObject3d, IWithTags } from '@/Engine/Mixins';

import type { ICamera } from './ICamera';
import type { ICameraAccessors } from './ICameraAccessors';

export type ICameraWrapper = IWrapper<ICamera> & IWithObject3d & IWithActiveMixin & ICameraAccessors & IMovable3dXYZ & IRotatable & IWithTags<string>;
