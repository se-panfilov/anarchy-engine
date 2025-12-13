import type { IAmbientLight } from './IAmbientLight';
import type { IDirectionalLight } from './IDirectionalLight';
import type { IHemisphereLight } from './IHemisphereLight';
import type { IPointLight } from './IPointLight';

export type ILight = IAmbientLight | IDirectionalLight | IPointLight | IHemisphereLight;
