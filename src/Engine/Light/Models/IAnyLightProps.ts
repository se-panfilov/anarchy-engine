import type { IAmbientLightProps } from './IAmbientLightProps';
import type { IDirectionalLightProps } from './IDirectionalLightProps';
import type { IHemisphereLightProps } from './IHemisphereLightProps';
import type { IPointLightProps } from './IPointLightProps';
import type { IRectAreaLightProps } from './IRectAreaLightProps';
import type { ISpotLightProps } from './ISpotLightProps';

export type IAnyLightProps = IAmbientLightProps | IHemisphereLightProps | IDirectionalLightProps | IPointLightProps | IRectAreaLightProps | ISpotLightProps;
