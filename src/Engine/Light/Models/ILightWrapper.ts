import type { IAmbientLightWrapper } from './IAmbientLightWrapper';
import type { IDirectionalLightWrapper } from './IDirectionalLightWrapper';
import type { IHemisphereLightWrapper } from './IHemisphereLightWrapper';
import type { IPointLightWrapper } from './IPointLightWrapper';
import type { IRectAreaLightWrapper } from './IRectAreaLightWrapper';
import type { ISpotLightWrapper } from './ISpotLightWrapper';

export type ILightWrapper = IAmbientLightWrapper | IDirectionalLightWrapper | IPointLightWrapper | IHemisphereLightWrapper | IRectAreaLightWrapper | ISpotLightWrapper;
