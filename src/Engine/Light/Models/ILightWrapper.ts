import type { IWrapper } from '@/Engine/Abstract';
import type { LightTag } from '@/Engine/Light/Constants';
import type { IAmbientLight, IDirectionalLight, ILightAccessors } from '@/Engine/Light/Models';
import type { IMovable3dXYZ, IRotatable, IWithObject3d, IWithTags } from '@/Engine/Mixins';

export type ILightWrapper = IWrapper<IAmbientLight | IDirectionalLight> & IWithObject3d & ILightAccessors & IMovable3dXYZ & IRotatable & IWithTags<LightTag>;
