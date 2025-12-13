import type { Subscription } from 'rxjs';
import { BufferAttribute, BufferGeometry, Points } from 'three';

import type { TAbstractWrapper } from '@/Abstract';
import { AbstractWrapper, WrapperType } from '@/Abstract';
import type { TColor } from '@/Color';
import type { TWithMaterial } from '@/Material';
import { isPointsMaterial, withMaterial } from '@/Material';
import { withObject3d } from '@/Mixins';
import { particlesToConfig } from '@/Particles/Adapters';
import type { TParticlesConfig, TParticlesParams, TParticlesServiceDependencies, TParticlesTransformDrive, TParticlesWrapper } from '@/Particles/Models';
import { ParticlesTransformDrive } from '@/Particles/TransformDrive';
import type { TBufferGeometry, TPoints } from '@/ThreeLib';
import type { TDriveToTargetConnector } from '@/TransformDrive';
import { DriveToTargetConnector } from '@/TransformDrive';
import type { TWriteable } from '@/Utils';
import { applyObject3dParams } from '@/Utils';

export function ParticlesWrapper(params: TParticlesParams, dependencies: TParticlesServiceDependencies): TParticlesWrapper {
  let geometry: TBufferGeometry = new BufferGeometry();
  let entity: TPoints = new Points(geometry, params.material.entity);

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

  const wrapper: TAbstractWrapper<TPoints> = AbstractWrapper(entity, WrapperType.Particles, params);
  const drive: TParticlesTransformDrive = ParticlesTransformDrive(params, dependencies, wrapper.id);
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
    entity,
    serialize: (): TParticlesConfig => particlesToConfig(result, { materialRegistry: dependencies.materialService.getRegistry() })
  });

  applyObject3dParams(result, params);

  const destroySub$: Subscription = result.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    //Material and geometry disposes in AbstractWrapper
    geometry = null as any;
    entity = null as any;
    // eslint-disable-next-line functional/immutable-data
    (result as TWriteable<TParticlesWrapper>).entity = null as any;
  });

  return result;
}
