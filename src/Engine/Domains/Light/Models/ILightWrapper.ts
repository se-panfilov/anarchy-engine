import type { IAmbientLight, IDirectionalLight, ILightAccessors } from '@Engine/Domains/Light/Models';
import type { IWrapper } from '@Engine/Models';

export type ILightWrapper = IWrapper<IAmbientLight | IDirectionalLight> & ILightAccessors;
