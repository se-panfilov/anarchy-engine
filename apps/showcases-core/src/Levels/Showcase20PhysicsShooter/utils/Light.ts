import type { TDirectionalLightWrapper, TLightService, TPointLightWrapper } from '@Anarchy/Engine';
import { LightType } from '@Anarchy/Engine';
import { CameraHelper, DirectionalLightHelper, Euler, Vector2, Vector3 } from 'three';
import type { Color } from 'three/src/math/Color';

export function initLight(lightService: TLightService): void {
  const directionalLight: TDirectionalLightWrapper = lightService.getRegistry().getByName('directional_light') as TDirectionalLightWrapper;
  const directionalLightHelper: DirectionalLightHelper = new DirectionalLightHelper(directionalLight.entity, 3);
  const directionalLightCameraHelper: CameraHelper = new CameraHelper(directionalLight.entity.shadow.camera);
  lightService.getScene().entity.add(directionalLightHelper);
  lightService.getScene().entity.add(directionalLightCameraHelper);
}

export function createFlashLight(lightService: TLightService, position: Vector3, color: Color, intensity = 5, distance = 50): TPointLightWrapper {
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
    position: new Vector3(0, 0, 0),
    rotation: new Euler(0, 0, 0),
    tags: ['flashlight']
  }) as TPointLightWrapper;

  light.drive.position$.next(position);

  return light;
}
