import { WrapperType } from '@/Engine/Abstract';
import type { IAmbientLight, IDirectionalLight, IHemisphereLight, ILight, IPointLight, IRectAreaLight } from '@/Engine/Light/Models';

export function getWrapperType(light: ILight): WrapperType | never {
  if (isAmbientLight(light)) return WrapperType.AmbientLight;
  else if (isDirectionalLight(light)) return WrapperType.DirectionalLight;
  else if (isPointLight(light)) return WrapperType.PointLight;
  else throw new Error('Unknown light type');
}

export function isAmbientLight(light: ILight): light is IAmbientLight {
  return Boolean((light as IAmbientLight).isAmbientLight);
}

export function isDirectionalLight(light: ILight): light is IDirectionalLight {
  return Boolean((light as IDirectionalLight).isDirectionalLight);
}

export function isPointLight(light: ILight): light is IPointLight {
  return Boolean((light as IPointLight).isPointLight);
}

export function isHemisphereLight(light: ILight): light is IHemisphereLight {
  return Boolean((light as IHemisphereLight).isHemisphereLight);
}

export function isRectAreaLight(light: ILight): light is IRectAreaLight {
  return Boolean((light as IRectAreaLight).isRectAreaLight);
}
