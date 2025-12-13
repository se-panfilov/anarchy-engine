import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { IParticlesParams, IParticlesWrapperAsync } from '@/Engine/Particles/Models';
import type { IWithMaterialActor } from '@/Engine/Material';
import { withMaterialActor } from '@/Engine/Material';
import { scalableMixin, withMoveBy3dMixin, withObject3d, withRotationByXyzMixin } from '@/Engine/Mixins';
import { withTexturesActor } from '@/Engine/Texture';
import { applyObject3dParams, applyPosition, applyRotation, applyScale, isDefined } from '@/Engine/Utils';

import { createActor } from './ParticlesUtils';

export async function ParticlesWrapperAsync(params: IParticlesParams): Promise<IParticlesWrapperAsync> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const entity: IMesh = await createActor(params);

  const withMaterialEntity: IWithMaterialActor = withMaterialActor(entity);

  const result = {
    ...AbstractWrapper(entity, WrapperType.Particles, params),
    ...withMoveBy3dMixin(entity),
    ...withRotationByXyzMixin(entity),
    ...scalableMixin(entity),
    ...withObject3d(entity),
    ...withMaterialEntity,
    ...withTexturesActor(withMaterialEntity),
    entity
  };

  applyPosition(result, params.position);
  applyRotation(result, params.rotation);
  if (isDefined(params.scale)) applyScale(result, params.scale);
  applyObject3dParams(result, params);

  return result;
}
