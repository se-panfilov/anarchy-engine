import type { IWrapper } from '@Engine/Domains/Abstract';

import type { IAmbientLight, IDirectionalLight, ILightAccessors } from '@/Engine/Domains/Light/Models';

export type ILightWrapper = IWrapper<IAmbientLight | IDirectionalLight> & ILightAccessors;
