import { BufferAttribute } from 'three';

import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { IColor } from '@/Engine/Color';
import type { IWithMaterial } from '@/Engine/Material';
import { isPointsMaterial, withMaterial } from '@/Engine/Material';
import { scalableMixin, withMoveBy3dMixin, withObject3d, withRotationByXyzMixin } from '@/Engine/Mixins';
import type { IParticlesParams, IParticlesWrapperAsync } from '@/Engine/Particles/Models';
import type { IPoints } from '@/Engine/ThreeLib';
import { applyObject3dParams, applyPosition, applyRotation, applyScale, isDefined } from '@/Engine/Utils';

import { createParticles } from './ParticlesUtils';

export async function ParticlesWrapperAsync(params: IParticlesParams): Promise<IParticlesWrapperAsync> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const entity: IPoints = await createParticles(params);
  const { material, geometry } = entity;
  if (!isPointsMaterial(material)) throw new Error('Material is not defined');

  const withMaterialEntity: IWithMaterial = withMaterial(entity);

  // eslint-disable-next-line functional/immutable-data
  const setMaterialColor = (color: IColor): void => void (material.color = color);
  const getMaterialColor = (): IColor => material.color;
  const setIndividualMaterialColor = (colors: Float32Array): void => void geometry.setAttribute('color', new BufferAttribute(colors, 3));
  // TODO (S.Panfilov) test this if it works
  const getIndividualMaterialColor = (): Float32Array => geometry.getAttribute('color').array as Float32Array;
  const setPositions = (positions: Float32Array): void => void geometry.setAttribute('position', new BufferAttribute(positions, 3));
  // TODO (S.Panfilov) test this if it works
  const getPositions = (): Float32Array => geometry.getAttribute('position').array as Float32Array;

  const result = {
    ...AbstractWrapper(entity, WrapperType.Particles, params),
    ...withMoveBy3dMixin(entity),
    ...withRotationByXyzMixin(entity),
    ...scalableMixin(entity),
    ...withObject3d(entity),
    ...withMaterialEntity,
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
