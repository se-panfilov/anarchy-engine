import type { IAmbientLight, IDirectionalLight, IOrthographicCamera, IVector2, IVector3 } from '@Engine/Models';
import type { ILightAccessors } from './Models';
import { Writeable } from '@Engine/Utils';

// eslint-disable-next-line functional/prefer-immutable-types
export function getAccessors(entity: Writeable<IAmbientLight | IDirectionalLight>): ILightAccessors {
  const setPosition = (x: number, y: number, z: number): IVector3 => entity.position.set(x, y, z);
  // eslint-disable-next-line functional/immutable-data
  const setCastShadow = (value: boolean): boolean => (entity.castShadow = value);
  const setControls = (x: number, y: number, z: number): IVector3 => entity.position.set(x, y, z);
  // eslint-disable-next-line functional/immutable-data
  const setFar = (far: number): number => ((entity.shadow.camera as Writeable<IOrthographicCamera>).far = far);
  const setShadowMapSize = (x: number, y: number): IVector2 => entity.shadow.mapSize.set(x, y);
  // eslint-disable-next-line functional/immutable-data
  const setNormalBias = (val: number): number => (entity.shadow.normalBias = val);

  return { setPosition, setCastShadow, setControls, setFar, setShadowMapSize, setNormalBias };
}
