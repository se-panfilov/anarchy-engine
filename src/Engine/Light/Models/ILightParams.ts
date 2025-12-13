import type { IAmbientLightParams } from './IAmbientLightParams';
import type { IDirectionalLightParams } from './IDirectionalLightParams';
import type { IHemisphereLightParams } from './IHemisphereLightParams';
import type { IPointLightParams } from './IPointLightParams';
import type { ISpotLightParams } from './ISpotLightParams';

export type ILightParams = IAmbientLightParams | IDirectionalLightParams | IPointLightParams | IHemisphereLightParams | ISpotLightParams;
