import type { IAmbientLightWrapper } from './IAmbientLightWrapper';
import type { IDirectionalLightWrapper } from './IDirectionalLightWrapper';
import type { IPointLightWrapper } from './IPointLightWrapper';

export type ILightWrapper = IAmbientLightWrapper | IDirectionalLightWrapper | IPointLightWrapper;
