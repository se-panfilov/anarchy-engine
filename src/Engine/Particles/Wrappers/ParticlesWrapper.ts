import type { Subscription } from 'rxjs';
import { BufferAttribute, BufferGeometry, Points } from 'three';

import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TColor } from '@/Engine/Color';
import type { TWithMaterial } from '@/Engine/Material';
import { isPointsMaterial, withMaterial } from '@/Engine/Material';
import { withObject3d } from '@/Engine/Mixins';
import type { TParticlesParams, TParticlesTransformDrive, TParticlesWrapper } from '@/Engine/Particles/Models';
import { ParticlesTransformDrive } from '@/Engine/Particles/TransformDrive';
import type { TBufferGeometry, TPoints } from '@/Engine/ThreeLib';
import type { TDriveToTargetConnector } from '@/Engine/TransformDrive';
import { DriveToTargetConnector } from '@/Engine/TransformDrive';
import { applyObject3dParams } from '@/Engine/Utils';

export function ParticlesWrapper(params: TParticlesParams): TParticlesWrapper {
  const geometry: TBufferGeometry = new BufferGeometry();
  const entity: TPoints = new Points(geometry, params.materialSource.entity);

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

  const wrapper = AbstractWrapper(entity, WrapperType.Particles, params);
  const drive: TParticlesTransformDrive = ParticlesTransformDrive(params, wrapper.id);
  const driveToTargetConnector: TDriveToTargetConnector = DriveToTargetConnector(drive, entity);

  // eslint-disable-next-line functional/immutable-data
  const result = Object.assign(wrapper, {
    drive,
    driveToTargetConnector,
    ...withObject3d(entity),
    ...withMaterialEntity,
    setMaterialColor,
    getMaterialColor,
    setIndividualMaterialColors,
    getIndividualMaterialColors,
    setIndividualPositions,
    getIndividualPositions,
    entity
  });

  applyObject3dParams(result, params);

  const destroySub$: Subscription = result.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    //Material and geometry disposes in AbstractWrapper
  });

  return result;
}
