import { CameraHelper, DirectionalLightHelper } from 'three';

import type { TDirectionalLightWrapper, TLightService } from '@/Engine';
import { isNotDefined } from '@/Engine';

export function initLight(lightService: TLightService): void {
  const directionalLight: TDirectionalLightWrapper | undefined = lightService.getRegistry().findByTag('directional') as TDirectionalLightWrapper | undefined;
  if (isNotDefined(directionalLight)) throw new Error(`Cannot find "directional_light" light`);
  const directionalLightHelper: DirectionalLightHelper = new DirectionalLightHelper(directionalLight.entity, 3);
  const directionalLightCameraHelper: CameraHelper = new CameraHelper(directionalLight.entity.shadow.camera);
  lightService.getScene().entity.add(directionalLightHelper);
  lightService.getScene().entity.add(directionalLightCameraHelper);
}
