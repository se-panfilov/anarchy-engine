import type { IWrapper } from '@/Engine/Abstract';
import type { LightTag } from '@/Engine/Light/Constants';
import { IAmbientLight, IDirectionalLight, ILightAccessors, IPointLight } from '@/Engine/Light/Models';
import type { IMovable3dXYZ, IRotatable, IWithObject3d, IWithTags } from '@/Engine/Mixins';

export type ILightWrapper = IWrapper<IAmbientLight | IDirectionalLight | IPointLight> & IWithObject3d & ILightAccessors & IMovable3dXYZ & IRotatable & IWithTags<LightTag>;
