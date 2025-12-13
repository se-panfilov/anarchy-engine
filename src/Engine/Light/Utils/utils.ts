import { WrapperType } from '@/Engine/Abstract';
import type {
  IAmbientLight,
  IAmbientLightParams,
  IDirectionalLight,
  IDirectionalLightParams,
  IHemisphereLight,
  IHemisphereLightParams,
  ILight,
  ILightParams,
  IPointLight,
  IPointLightParams,
  IRectAreaLight,
  IRectAreaLightParams
} from '@/Engine/Light/Models';
import { isDefined } from '@/Engine/Utils';

export function getWrapperType(light: ILight): WrapperType | never {
  if (isAmbientLight(light)) return WrapperType.AmbientLight;
  else if (isDirectionalLight(light)) return WrapperType.DirectionalLight;
  else if (isPointLight(light)) return WrapperType.PointLight;
  else if (isHemisphereLight(light)) return WrapperType.HemisphereLight;
  else if (isRectAreaLight(light)) return WrapperType.RectAreaLight;
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

export function isAmbientLightParams(params: ILightParams): params is IAmbientLightParams {
  return isDefined((params as IAmbientLightParams).color) && isDefined((params as IAmbientLightParams).intensity);
}

export function isDirectionalLightParams(params: ILightParams): params is IDirectionalLightParams {
  return isDefined((params as IDirectionalLightParams).color) && isDefined((params as IDirectionalLightParams).intensity);
}

export function isPointLightParams(params: ILightParams): params is IPointLightParams {
  return isDefined((params as IPointLightParams).color) && isDefined((params as IPointLightParams).intensity);
}

export function isHemisphereLightParams(params: ILightParams): params is IHemisphereLightParams {
  return isDefined((params as IHemisphereLightParams).color) && isDefined((params as IHemisphereLightParams).groundColor) && isDefined((params as IHemisphereLightParams).intensity);
}

export function isRectAreaLightParams(params: ILightParams): params is IRectAreaLightParams {
  return (
    isDefined((params as IRectAreaLightParams).color) &&
    isDefined((params as IRectAreaLightParams).intensity) &&
    isDefined((params as IRectAreaLightParams).height) &&
    isDefined((params as IRectAreaLightParams).width)
  );
}
