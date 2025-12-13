import type { IAmbientLight, IDirectionalLight, IWrapper } from '@Engine/Models';
import type { ILightAccessors } from '@Engine/Wrappers';

export type ILightWrapper = IWrapper<IAmbientLight | IDirectionalLight> & ILightAccessors;
