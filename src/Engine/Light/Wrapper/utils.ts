import { WrapperType } from '@/Engine/Abstract';
import type { IAmbientLight, IDirectionalLight, IPointLight } from '@/Engine/Light/Models';

export function getWrapperType(light: IAmbientLight | IDirectionalLight | IPointLight): WrapperType | never {
  if (isAmbientLight(light)) return WrapperType.AmbientLight;
  else if (isDirectionalLight(light)) return WrapperType.DirectionalLight;
  else if (isPointLight(light)) return WrapperType.PointLight;
  else throw new Error('Unknown light type');
}

export function isAmbientLight(light: IAmbientLight | IDirectionalLight | IPointLight): light is IAmbientLight {
  return Boolean((light as IAmbientLight).isAmbientLight);
}

export function isDirectionalLight(light: IAmbientLight | IDirectionalLight | IPointLight): light is IDirectionalLight {
  return Boolean((light as IDirectionalLight).isDirectionalLight);
}

export function isPointLight(light: IAmbientLight | IDirectionalLight | IPointLight): light is IPointLight {
  return Boolean((light as IPointLight).isPointLight);
}
