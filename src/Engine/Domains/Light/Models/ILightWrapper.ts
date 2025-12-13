import type { IWrapper } from '@Engine/Domains/Abstract';

import type { IAmbientLight, IDirectionalLight, ILightAccessors } from '../Models';

export type ILightWrapper = IWrapper<IAmbientLight | IDirectionalLight> & ILightAccessors;
