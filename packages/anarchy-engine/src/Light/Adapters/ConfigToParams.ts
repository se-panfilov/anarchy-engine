import { configToParamsCameraOptionsOnly } from '@Anarchy/Engine/Camera/Adapters/ConfigToParams';
import type { TAnyLightConfig, TLightParams, TLightShadowConfig, TLightShadowParams, TShadowCameraConfig, TShadowCameraParams } from '@Anarchy/Engine/Light/Models';
import { object3dConfigToParams } from '@Anarchy/Engine/ThreeLib';
import { isDefined, isNotDefined } from '@hellpig/anarchy-shared/Utils';
import { Color, Vector2 } from 'three';

export function lightConfigToParams(config: TAnyLightConfig): TLightParams {
  const { position, rotation, scale, layers, color, shadow, ...rest } = config;

  return {
    ...rest,
    ...object3dConfigToParams({ position, rotation, scale, layers }),
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
