import type {
  ActorConfig,
  ActorMaterialConfig,
  CameraConfig,
  LightConfig,
  LightShadowConfig
} from '@Engine/Launcher/Models';
import type { ActorParams, CameraParams, LightParams, LightShadowParams } from '@Engine/Models';
import type { MeshToonMaterialParameters } from 'three';
import { Color, Vector2, Vector3 } from 'three';
import { isDefined } from '@Engine/Utils';

export function actorAdapter(config: ActorConfig): ActorParams {
  const { materialParams, position, ...rest } = config;
  return {
    ...rest,
    ...getAdaptedMaterialParams(materialParams),
    position: new Vector3(position.x, position.y, position.z)
  };
}

function getAdaptedMaterialParams(materialParams: ActorMaterialConfig): {
  materialParams: MeshToonMaterialParameters | undefined;
} {
  const hasColor: boolean = isDefined(materialParams?.color);
  const color: Color | undefined = hasColor ? new Color(materialParams.color) : undefined;
  return { materialParams: { ...materialParams, color } };
}

export function cameraAdapter(config: CameraConfig): CameraParams {
  const { position, ...rest } = config;
  return {
    ...rest,
    position: new Vector3(position.x, position.y, position.z)
  };
}

export function lightAdapter(config: LightConfig): LightParams {
  const { position, color, shadow, ...rest } = config;
  return {
    ...rest,
    ...getLightColorParams(color),
    ...getLightShadowParams(shadow),
    position: new Vector3(position.x, position.y, position.z)
  };
}

function getLightColorParams(colorStr: string): { color: Color } {
  return { color: new Color(colorStr) };
}

function getLightShadowParams(shadow: LightShadowConfig): { shadow: LightShadowParams } {
  return { shadow: { ...shadow, mapSize: new Vector2(shadow.mapSize.x, shadow.mapSize.y) } };
}
