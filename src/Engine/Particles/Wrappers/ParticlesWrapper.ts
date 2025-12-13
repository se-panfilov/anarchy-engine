import { BufferAttribute, BufferGeometry, Points } from 'three';

import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TColor } from '@/Engine/Color';
import type { TWithMaterial } from '@/Engine/Material';
import { isPointsMaterial, withMaterial } from '@/Engine/Material';
import { scalableMixin, withMoveBy3dMixin, withObject3d, withRotationByXyzMixin } from '@/Engine/Mixins';
import type { TParticlesParams, TParticlesWrapper } from '@/Engine/Particles/Models';
import type { TBufferGeometry, TPoints } from '@/Engine/ThreeLib';
import { applyObject3dParams, applyPosition, applyRotation, applyScale, isDefined } from '@/Engine/Utils';

export function ParticlesWrapper(params: TParticlesParams): TParticlesWrapper {
  const geometry: TBufferGeometry = new BufferGeometry();
  const entity: TPoints = new Points(geometry, params.material.entity);

  const { material } = entity;
  if (!isPointsMaterial(material)) throw new Error('Material is not PointsMaterial or not defined');

  const withMaterialEntity: TWithMaterial = withMaterial(entity);

  // eslint-disable-next-line functional/immutable-data
  const setMaterialColor = (color: TColor): void => void (material.color = color);
  const getMaterialColor = (): TColor => material.color;
  const setIndividualMaterialColors = (colors: Float32Array): void => void geometry.setAttribute('color', new BufferAttribute(colors, 3));
  const getIndividualMaterialColors = (): Float32Array => geometry.getAttribute('color').array as Float32Array;
  const setIndividualPositions = (positions: Float32Array): void => void geometry.setAttribute('position', new BufferAttribute(positions, 3));
  const getIndividualPositions = (): Float32Array => geometry.getAttribute('position').array as Float32Array;

  const result = {
    ...AbstractWrapper(entity, WrapperType.Particles, params),
    ...withMoveBy3dMixin(entity),
    ...withRotationByXyzMixin(entity),
    ...scalableMixin(entity),
    ...withObject3d(entity),
    ...withMaterialEntity,
    setMaterialColor,
    getMaterialColor,
    setIndividualMaterialColors,
    getIndividualMaterialColors,
    setIndividualPositions,
    getIndividualPositions,
    entity
  };

  applyPosition(result, params.position);
  applyRotation(result, params.rotation);
  if (isDefined(params.scale)) applyScale(result, params.scale);
  applyObject3dParams(result, params);

  return result;
}
