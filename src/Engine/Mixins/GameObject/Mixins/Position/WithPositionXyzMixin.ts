import type { IWithPositionXYZ, IWithPositionXyzProperty } from '@/Engine/Mixins/GameObject/Models';
import { isVector3Wrapper } from '@/Engine/Utils';
import type { IVector3Wrapper } from '@/Engine/Wrappers';
import { Vector3Wrapper } from '@/Engine/Wrappers';

export function withPositionXyzMixin(entity: IWithPositionXyzProperty): IWithPositionXYZ {
  const setPosition = (position: IVector3Wrapper): IVector3Wrapper => {
    if (!isVector3Wrapper(position)) throw new Error('Trying to set up Vector3 with Vector2 or Vector4');
    return Vector3Wrapper(entity.position.set(position.getX(), position.getY(), position.getZ()));
  };

  const getPosition = (): IVector3Wrapper => Vector3Wrapper(entity.position);
  return { setPosition, getPosition };
}
