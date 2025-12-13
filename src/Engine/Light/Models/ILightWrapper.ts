import type { IAmbientLightWrapper } from './IAmbientLightWrapper';
import type { IDirectionalLightWrapper } from './IDirectionalLightWrapper';
import type { IHemisphereLightWrapper } from './IHemisphereLightWrapper';
import type { IPointLightWrapper } from './IPointLightWrapper';
import type { IRectAreaLightWrapper } from './IRectAreaLightWrapper';

export type ILightWrapper = IAmbientLightWrapper | IDirectionalLightWrapper | IPointLightWrapper | IHemisphereLightWrapper | IRectAreaLightWrapper;
