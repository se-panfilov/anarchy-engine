import { WrapperType } from '@/Engine/Abstract';
import type {
  TAmbientLight,
  TAmbientLightParams,
  TAnyLight,
  TDirectionalLight,
  TDirectionalLightParams,
  THemisphereLight,
  THemisphereLightParams,
  TLightParams,
  TPointLight,
  TPointLightParams,
  TRectAreaLight,
  TRectAreaLightParams,
  TSpotLight,
  TSpotLightParams
} from '@/Engine/Light/Models';
import { isDefined } from '@/Engine/Utils';

export function getWrapperType(light: TAnyLight): WrapperType | never {
  if (isAmbientLight(light)) return WrapperType.AmbientLight;
  else if (isDirectionalLight(light)) return WrapperType.DirectionalLight;
  else if (isPointLight(light)) return WrapperType.PointLight;
  else if (isHemisphereLight(light)) return WrapperType.HemisphereLight;
  else if (isRectAreaLight(light)) return WrapperType.RectAreaLight;
  else if (isSpotLight(light)) return WrapperType.SpotLight;
  else throw new Error('Unknown light type');
}

export function isAmbientLight(light: TAnyLight): light is TAmbientLight {
  return Boolean((light as TAmbientLight).isAmbientLight);
}

export function isDirectionalLight(light: TAnyLight): light is TDirectionalLight {
  return Boolean((light as TDirectionalLight).isDirectionalLight);
}

export function isPointLight(light: TAnyLight): light is TPointLight {
  return Boolean((light as TPointLight).isPointLight);
}

export function isHemisphereLight(light: TAnyLight): light is THemisphereLight {
  return Boolean((light as THemisphereLight).isHemisphereLight);
}

export function isRectAreaLight(light: TAnyLight): light is TRectAreaLight {
  return Boolean((light as TRectAreaLight).isRectAreaLight);
}

export function isSpotLight(light: TAnyLight): light is TSpotLight {
  return Boolean((light as TSpotLight).isSpotLight);
}

export function isAmbientLightParams(params: TLightParams): params is TAmbientLightParams {
  return isDefined((params as TAmbientLightParams).color) && isDefined((params as TAmbientLightParams).intensity);
}

export function isDirectionalLightParams(params: TLightParams): params is TDirectionalLightParams {
  return isDefined((params as TDirectionalLightParams).color) && isDefined((params as TDirectionalLightParams).intensity);
}

export function isPointLightParams(params: TLightParams): params is TPointLightParams {
  return isDefined((params as TPointLightParams).color) && isDefined((params as TPointLightParams).intensity);
}

export function isHemisphereLightParams(params: TLightParams): params is THemisphereLightParams {
  return isDefined((params as THemisphereLightParams).color) && isDefined((params as THemisphereLightParams).groundColor) && isDefined((params as THemisphereLightParams).intensity);
}

export function isRectAreaLightParams(params: TLightParams): params is TRectAreaLightParams {
  return (
    isDefined((params as TRectAreaLightParams).color) &&
    isDefined((params as TRectAreaLightParams).intensity) &&
    isDefined((params as TRectAreaLightParams).height) &&
    isDefined((params as TRectAreaLightParams).width)
  );
}

export function isSpotLightParams(params: TLightParams): params is TSpotLightParams {
  return (
    isDefined((params as TSpotLightParams).color) &&
    isDefined((params as TSpotLightParams).intensity) &&
    isDefined((params as TSpotLightParams).angle) &&
    isDefined((params as TSpotLightParams).penumbra) &&
    isDefined((params as TSpotLightParams).decay) &&
    isDefined((params as TSpotLightParams).distance)
  );
}
