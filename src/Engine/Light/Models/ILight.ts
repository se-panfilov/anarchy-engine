import type { IAmbientLight } from './IAmbientLight';
import type { IDirectionalLight } from './IDirectionalLight';
import type { IHemisphereLight } from './IHemisphereLight';
import type { IPointLight } from './IPointLight';
import type { IRectAreaLight } from './IRectAreaLight';
import type { ISpotLight } from './ISpotLight';

export type ILight = IAmbientLight | IDirectionalLight | IPointLight | IHemisphereLight | IRectAreaLight | ISpotLight;
