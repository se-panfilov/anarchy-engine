import type { IAmbientLight, IDirectionalLight, IOrthographicCamera } from '@Engine/Models';
import { Writeable } from '@Engine/Utils';

import type { ILightAccessors } from './Models';
import type { IVector2 } from '@/Engine/Wrappers/Vector2Wrapper';
import type { IVector3 } from '@/Engine/Wrappers/Vector3Wrapper';

// eslint-disable-next-line functional/prefer-immutable-types
export function getAccessors(entity: Writeable<IAmbientLight | IDirectionalLight>): ILightAccessors {
  const setPosition = (x: number, y: number, z: number): IVector3 => entity.position.set(x, y, z);
  // eslint-disable-next-line functional/immutable-data
  const setCastShadow = (value: boolean): boolean => (entity.castShadow = value);
  const setControls = (x: number, y: number, z: number): IVector3 => entity.position.set(x, y, z);
  // eslint-disable-next-line functional/immutable-data

  // TODO (S.Panfilov) CWP this function doesn't work yet
  const setFar = (): number => {
    return 43; //((entity.shadow.camera as Writeable<IOrthographicCamera>).far = far);
  };
  // TODO (S.Panfilov) CWP this function doesn't work yet
  const setShadowMapSize = (): IVector2 => {
    return { x: 3, y: 3 } as any; //entity.shadow.mapSize.set(x, y);
  };
  // TODO (S.Panfilov) CWP this function doesn't work yet
  // eslint-disable-next-line functional/immutable-data
  const setNormalBias = (): number => {
    return 32; //(entity.shadow.normalBias = val);
  };

  return { setPosition, setCastShadow, setControls, setFar, setShadowMapSize, setNormalBias };
}
