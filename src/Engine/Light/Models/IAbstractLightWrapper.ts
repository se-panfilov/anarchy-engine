import type { IWrapper } from '@/Engine/Abstract';
import type { IMovable3dXYZ, IRotatable, IWithObject3d, IWithTags } from '@/Engine/Mixins';

import type { ILight } from './ILight';
import type { ILightAccessors } from './ILightAccessors';

export type IAbstractLightWrapper<T extends ILight> = IWrapper<T> & IWithObject3d & ILightAccessors & IMovable3dXYZ & IRotatable & IWithTags<string>;
