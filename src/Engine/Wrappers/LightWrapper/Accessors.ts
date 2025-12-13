import type { Vector2, Vector3 } from 'three';
import { AmbientLight, DirectionalLight } from 'three';
import type { OrthographicCamera } from 'three/src/cameras/OrthographicCamera';
import { IAccessors } from './Models';

export function getAccessors(entity: AmbientLight | DirectionalLight): IAccessors {
  const setPosition = (x: number, y: number, z: number): Vector3 => entity.position.set(x, y, z);
  // eslint-disable-next-line functional/immutable-data
  const setCastShadow = (value: boolean): boolean => (entity.castShadow = value);
  const setControls = (x: number, y: number, z: number): Vector3 => entity.position.set(x, y, z);
  const setFar = (far: number): number => ((entity.shadow.camera as OrthographicCamera).far = far);
  const setShadowMapSize = (x: number, y: number): Vector2 => entity.shadow.mapSize.set(x, y);
  const setNormalBias = (val: number): number => (entity.shadow.normalBias = val);

  return { setPosition, setCastShadow, setControls, setFar, setShadowMapSize, setNormalBias };
}
