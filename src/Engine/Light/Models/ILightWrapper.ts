import type { IAmbientLightWrapper } from './IAmbientLightWrapper';
import type { IDirectionalLightWrapper } from './IDirectionalLightWrapper';
import type { IHemisphereLightWrapper } from './IHemisphereLightWrapper';
import type { IPointLightWrapper } from './IPointLightWrapper';

export type ILightWrapper = IAmbientLightWrapper | IDirectionalLightWrapper | IPointLightWrapper | IHemisphereLightWrapper;
