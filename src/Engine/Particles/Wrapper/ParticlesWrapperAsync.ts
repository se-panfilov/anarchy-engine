import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { IParticlesParams, IParticlesWrapperAsync } from '@/Engine/Particles/Models';
import type { IWithMaterial } from '@/Engine/Material';
import { withMaterial } from '@/Engine/Material';
import { scalableMixin, withMoveBy3dMixin, withObject3d, withRotationByXyzMixin } from '@/Engine/Mixins';
import { withTextures } from '@/Engine/Texture';
import { applyObject3dParams, applyPosition, applyRotation, applyScale, isDefined } from '@/Engine/Utils';

import { createParticles } from './ParticlesUtils';

export async function ParticlesWrapperAsync(params: IParticlesParams): Promise<IParticlesWrapperAsync> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const entity: IMesh = await createParticles(params);

  const withMaterialEntity: IWithMaterial = withMaterial(entity);

  const result = {
    ...AbstractWrapper(entity, WrapperType.Particles, params),
    ...withMoveBy3dMixin(entity),
    ...withRotationByXyzMixin(entity),
    ...scalableMixin(entity),
    ...withObject3d(entity),
    ...withMaterialEntity,
    ...withTextures(withMaterialEntity),
    entity
  };

  applyPosition(result, params.position);
  applyRotation(result, params.rotation);
  if (isDefined(params.scale)) applyScale(result, params.scale);
  applyObject3dParams(result, params);

  return result;
}
