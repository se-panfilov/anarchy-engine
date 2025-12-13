import { configToParamsCameraOptionsOnly } from '@Engine/Camera/Adapters/ConfigToParams';
import type { TAnyLightConfig, TLightParams, TLightShadowConfig, TLightShadowParams, TShadowCameraConfig, TShadowCameraParams } from '@Engine/Light/Models';
import { configToParamsObject3d } from '@Engine/ThreeLib';
import { isDefined, isNotDefined } from '@Shared/Utils';
import { Color, Vector2 } from 'three';

export function configToParams(config: TAnyLightConfig): TLightParams {
  const { position, rotation, scale, layers, color, shadow, ...rest } = config;

  return {
    ...rest,
    ...configToParamsObject3d({ position, rotation, scale, layers }),
    ...getLightColorParams(color),
    ...getLightShadowParams(shadow)
  };
}

function getLightColorParams(colorStr: string): Readonly<{ color: Color }> {
  return { color: new Color(colorStr) };
}

function getLightShadowParams(shadow: TLightShadowConfig | undefined): Readonly<{ shadow?: TLightShadowParams }> {
  if (isNotDefined(shadow)) return {};
  let camera: TShadowCameraParams = {} as any;
  if (isDefined(shadow.camera)) {
    const cameraConfig: TShadowCameraConfig | undefined = shadow.camera;
    camera = configToParamsCameraOptionsOnly(cameraConfig);
  }

  return { shadow: { ...shadow, camera, mapSize: new Vector2(shadow.mapSize.x, shadow.mapSize.y) } };
}
