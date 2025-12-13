import type { IAmbientLight, IDirectionalLight, IOrthographicCamera, IVector2, IVector3 } from '@Engine/Models';
import type { ILightAccessors } from './Models';

export function getAccessors(entity: IAmbientLight | IDirectionalLight): ILightAccessors {
  const setPosition = (x: number, y: number, z: number): IVector3 => entity.position.set(x, y, z);
  const setCastShadow = (value: boolean): boolean => (entity.castShadow = value);
  const setControls = (x: number, y: number, z: number): IVector3 => entity.position.set(x, y, z);
  const setFar = (far: number): number => ((entity.shadow.camera as IOrthographicCamera).far = far);
  const setShadowMapSize = (x: number, y: number): IVector2 => entity.shadow.mapSize.set(x, y);
  // eslint-disable-next-line functional/immutable-data
  const setNormalBias = (val: number): number => (entity.shadow.normalBias = val);

  return { setPosition, setCastShadow, setControls, setFar, setShadowMapSize, setNormalBias };
}
