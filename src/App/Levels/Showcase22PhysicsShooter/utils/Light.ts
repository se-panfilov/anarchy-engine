import { CameraHelper, DirectionalLightHelper, Vector2 } from 'three';
import type { Color } from 'three/src/math/Color';

import type { TDirectionalLightWrapper, TLightService, TPointLightWrapper, TVector3 } from '@/Engine';
import { isNotDefined, LightType, Vector3Wrapper } from '@/Engine';

export function initLight(lightService: TLightService): void {
  const directionalLight: TDirectionalLightWrapper | undefined = lightService.getRegistry().findByTag('directional') as TDirectionalLightWrapper | undefined;
  if (isNotDefined(directionalLight)) throw new Error(`Cannot find "directional_light" light`);
  const directionalLightHelper: DirectionalLightHelper = new DirectionalLightHelper(directionalLight.entity, 3);
  const directionalLightCameraHelper: CameraHelper = new CameraHelper(directionalLight.entity.shadow.camera);
  lightService.getScene().entity.add(directionalLightHelper);
  lightService.getScene().entity.add(directionalLightCameraHelper);
}

export function createFlashLight(lightService: TLightService, position: TVector3, color: Color, intensity = 5, distance = 50): TPointLightWrapper {
  // TODO this is too costly to create a light every time, but it's just a showcase, so whatever
  const light: TPointLightWrapper = lightService.create({
    type: LightType.Point,
    name: 'flashlight',
    color,
    intensity,
    distance,
    castShadow: true,
    shadow: {
      normalBias: 0.0001,
      mapSize: new Vector2(16, 16),
      camera: { near: 0.1, far: 100 }
    },
    tags: ['flashlight']
  }) as TPointLightWrapper;

  light.setPosition(Vector3Wrapper(position));

  return light;
}
