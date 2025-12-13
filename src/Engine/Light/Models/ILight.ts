import type { IAmbientLight } from './IAmbientLight';
import type { IDirectionalLight } from './IDirectionalLight';
import type { IPointLight } from './IPointLight';
import type { IHemisphereLight } from './IHemisphereLight';

export type ILight = IAmbientLight | IDirectionalLight | IPointLight | IHemisphereLight;
