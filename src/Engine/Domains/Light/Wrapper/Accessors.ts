import type { IOrthographicCamera } from '@/Engine/Domains/Camera';
import type { IAmbientLight, IDirectionalLight, ILightAccessors } from '@/Engine/Domains/Light/Models';
import type { IVector2Wrapper, IVector3Wrapper } from '@/Engine/Domains/Vector';
import { Vector2Wrapper, Vector3Wrapper } from '@/Engine/Domains/Vector';
import type { IWriteable } from '@/Engine/Utils';

// eslint-disable-next-line functional/prefer-immutable-types
export function getAccessors(entity: IWriteable<IAmbientLight | IDirectionalLight>): ILightAccessors {
  const setControls = (x: number, y: number, z: number): IVector3Wrapper => Vector3Wrapper(entity.position.set(x, y, z));

  function setFar(far: number): number | never {
    if (isAmbientLight(entity)) throw new Error('Cannot call "setFar" for IAmbientLight');
    // eslint-disable-next-line functional/immutable-data
    return ((entity.shadow.camera as IWriteable<IOrthographicCamera>).far = far);
  }

  function setShadowMapSize(x: number, y: number): IVector2Wrapper | never {
    if (isAmbientLight(entity)) throw new Error('Cannot call "setShadowMapSize" for IAmbientLight');
    // eslint-disable-next-line functional/immutable-data
    return Vector2Wrapper(entity.shadow.mapSize.set(x, y));
  }

  function setNormalBias(val: number): number {
    if (isAmbientLight(entity)) throw new Error('Cannot call "setNormalBias" for IAmbientLight');
    // eslint-disable-next-line functional/immutable-data
    return (entity.shadow.normalBias = val);
  }

  return { setControls, setFar, setShadowMapSize, setNormalBias };
}

// function isDirectionalLight(light: IAmbientLight | IDirectionalLight): light is IDirectionalLight {
//   return Boolean((light as IDirectionalLight).isDirectionalLight);
// }

function isAmbientLight(light: IAmbientLight | IDirectionalLight): light is IAmbientLight {
  return Boolean((light as IAmbientLight).isAmbientLight);
}
