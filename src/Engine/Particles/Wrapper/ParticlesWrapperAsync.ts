import { BufferAttribute } from 'three';

import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { IWithMaterial } from '@/Engine/Material';
import { withMaterial } from '@/Engine/Material';
import { scalableMixin, withMoveBy3dMixin, withObject3d, withRotationByXyzMixin } from '@/Engine/Mixins';
import type { IParticlesParams, IParticlesWrapperAsync } from '@/Engine/Particles/Models';
import { withTextures } from '@/Engine/Texture';
import { IBufferGeometry, IPoints } from '@/Engine/ThreeLib';
import { applyObject3dParams, applyPosition, applyRotation, applyScale, isDefined } from '@/Engine/Utils';

import { createParticles } from './ParticlesUtils';
import type { IColor } from '@/Engine/Color';

export async function ParticlesWrapperAsync(params: IParticlesParams): Promise<IParticlesWrapperAsync> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const entity: IPoints = await createParticles(params);

  // const withMaterialEntity: IWithMaterial = withMaterial(entity);
  const setMaterialColor = (color: IColor): void => void (entity.material.color = color);
  const getMaterialColor = (): IColor => entity.material.color;
  const setIndividualMaterialColor = (entity: IPoints, colors: Float32Array): void => void entity.setAttribute('color', new BufferAttribute(colors, 3));
  // TODO (S.Panfilov) test this if it works
  const getIndividualMaterialColor = (): Float32Array => entity.material.getAttribute('color').array as Float32Array;
  const setPositions = (entity: IPoints, positions: Float32Array): void => void entity.setAttribute('position', new BufferAttribute(positions, 3));
  // TODO (S.Panfilov) test this if it works
  const getPositions = (): Float32Array => entity.getAttribute('position').array as Float32Array;

  const result = {
    ...AbstractWrapper(entity, WrapperType.Particles, params),
    ...withMoveBy3dMixin(entity),
    ...withRotationByXyzMixin(entity),
    ...scalableMixin(entity),
    ...withObject3d(entity),
    // ...withMaterialEntity,
    // ...withTextures(withMaterialEntity),
    setMaterialColor,
    getMaterialColor,
    setIndividualMaterialColor,
    getIndividualMaterialColor,
    setPositions,
    getPositions,
    entity
  };

  applyPosition(result, params.position);
  applyRotation(result, params.rotation);
  if (isDefined(params.scale)) applyScale(result, params.scale);
  applyObject3dParams(result, params);

  return result;
}
