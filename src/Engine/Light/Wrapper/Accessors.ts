import type { IOrthographicCamera } from '@/Engine/Camera';
import type { ILight, ILightAccessors } from '@/Engine/Light/Models';
import { isAmbientLight, isHemisphereLight, isRectAreaLight } from '@/Engine/Light/Utils';
import type { IWriteable } from '@/Engine/Utils';
import type { IVector2Wrapper, IVector3Wrapper } from '@/Engine/Vector';
import { Vector2Wrapper, Vector3Wrapper } from '@/Engine/Vector';

// TODO (S.Panfilov) spit generic accessors into separate accessors, e.g. IAmbientLightAccessors, IDirectionalLightAccessors, etc.
// eslint-disable-next-line functional/prefer-immutable-types
export function getAccessors(entity: IWriteable<ILight>): ILightAccessors {
  const setControls = (x: number, y: number, z: number): IVector3Wrapper => Vector3Wrapper(entity.position.set(x, y, z));

  function setFar(far: number): number | never {
    if (isAmbientLight(entity)) throw new Error('Cannot call "setFar" for IAmbientLight');
    if (isHemisphereLight(entity)) throw new Error('Cannot call "setFar" for IHemisphereLight');
    if (isRectAreaLight(entity)) throw new Error('Cannot call "setFar" for IRectAreaLight');
    // eslint-disable-next-line functional/immutable-data
    return ((entity.shadow.camera as IWriteable<IOrthographicCamera>).far = far);
  }

  function setShadowMapSize(x: number, y: number): IVector2Wrapper | never {
    if (isAmbientLight(entity)) throw new Error('Cannot call "setShadowMapSize" for IAmbientLight');
    if (isHemisphereLight(entity)) throw new Error('Cannot call "setShadowMapSize" for IHemisphereLight');
    if (isRectAreaLight(entity)) throw new Error('Cannot call "setShadowMapSize" for IRectAreaLight');
    // eslint-disable-next-line functional/immutable-data
    return Vector2Wrapper(entity.shadow.mapSize.set(x, y));
  }

  function setNormalBias(val: number): number {
    if (isAmbientLight(entity)) throw new Error('Cannot call "setNormalBias" for IAmbientLight');
    if (isHemisphereLight(entity)) throw new Error('Cannot call "setNormalBias" for IHemisphereLight');
    if (isRectAreaLight(entity)) throw new Error('Cannot call "setNormalBias" for IRectAreaLight');
    // eslint-disable-next-line functional/immutable-data
    return (entity.shadow.normalBias = val);
  }

  return { setControls, setFar, setShadowMapSize, setNormalBias };
}
