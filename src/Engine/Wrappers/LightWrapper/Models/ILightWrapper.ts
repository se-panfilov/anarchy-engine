import type { ILightAccessors } from '@Engine/Wrappers';
import type { IAmbientLight, IWrapper } from '@Engine/Models';

export type ILightWrapper = IWrapper<IAmbientLight | IDirectionalLight> & ILightAccessors;
