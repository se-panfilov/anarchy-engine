import type { IOrthographicCamera } from '@Engine/Domains/Camera';
import type { IAmbientLight, IDirectionalLight, ILightAccessors } from '@Engine/Domains/Light';
import type { Writeable } from '@Engine/Utils';

import type { IVector2 } from '@/Engine/Wrappers/Vector2Wrapper';
import type { IVector3 } from '@/Engine/Wrappers/Vector3Wrapper';

// eslint-disable-next-line functional/prefer-immutable-types
export function getAccessors(entity: Writeable<IAmbientLight | IDirectionalLight>): ILightAccessors {
  const setPosition = (x: number, y: number, z: number): IVector3 => entity.position.set(x, y, z);
  // eslint-disable-next-line functional/immutable-data
  const setCastShadow = (value: boolean): boolean => (entity.castShadow = value);
  const setControls = (x: number, y: number, z: number): IVector3 => entity.position.set(x, y, z);

  function setFar(far: number): number | never {
    if (isAmbientLight(entity)) throw new Error('Cannot call "setFar" for IAmbientLight');
    // eslint-disable-next-line functional/immutable-data
    return ((entity.shadow.camera as Writeable<IOrthographicCamera>).far = far);
  }

  function setShadowMapSize(x: number, y: number): IVector2 {
    if (isAmbientLight(entity)) throw new Error('Cannot call "setShadowMapSize" for IAmbientLight');
    // eslint-disable-next-line functional/immutable-data
    return entity.shadow.mapSize.set(x, y);
  }

  function setNormalBias(val: number): number {
    if (isAmbientLight(entity)) throw new Error('Cannot call "setNormalBias" for IAmbientLight');
    // eslint-disable-next-line functional/immutable-data
    return (entity.shadow.normalBias = val);
  }

  return { setPosition, setCastShadow, setControls, setFar, setShadowMapSize, setNormalBias };
}

// function isDirectionalLight(light: IAmbientLight | IDirectionalLight): light is IDirectionalLight {
//   return Boolean((light as IDirectionalLight).isDirectionalLight);
// }

function isAmbientLight(light: IAmbientLight | IDirectionalLight): light is IAmbientLight {
  return Boolean((light as IAmbientLight).isAmbientLight);
}
