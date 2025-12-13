import { BufferGeometry, Points } from 'three';

import type { IMaterialWrapper } from '@/Engine/Material';
import type { IMaterialTextureService } from '@/Engine/MaterialTexturePack';
import type { IParticlesParams } from '@/Engine/Particles/Models';
import type { IBufferGeometry, IPoints } from '@/Engine/ThreeLib';

export async function createParticles(params: IParticlesParams, materialTextureService: IMaterialTextureService): Promise<IPoints> | never {
  const material: IMaterialWrapper = await materialTextureService.createAsync(params.material);

  const geometry: IBufferGeometry = new BufferGeometry();

  return new Points(geometry, material.entity);
}
