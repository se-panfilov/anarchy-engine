import type { IAmbientLightParams } from './IAmbientLightParams';
import type { IDirectionalLightParams } from './IDirectionalLightParams';
import type { IPointLightParams } from './IPointLightParams';

export type ILightParams = IAmbientLightParams | IDirectionalLightParams | IPointLightParams;
