import type { IWrapper } from '@/Engine/Domains/Abstract';
import type { LightTag } from '@/Engine/Domains/Light/Constants';
import type { IAmbientLight, IDirectionalLight, ILightAccessors } from '@/Engine/Domains/Light/Models';
import type { IMovableXYZ, IRotatable, IWithObject3d, IWithTags } from '@/Engine/Mixins';

export type ILightWrapper = IWrapper<IAmbientLight | IDirectionalLight> & IWithObject3d & ILightAccessors & IMovableXYZ & IRotatable & IWithTags<LightTag>;
