import { BufferGeometry, Points } from 'three';

import type { TMaterialWrapper } from '@/Engine/Material';
import type { TMaterialTextureService } from '@/Engine/MaterialTexturePack';
import type { IParticlesParams } from '@/Engine/Particles/Models';
import type { IBufferGeometry, IPoints } from '@/Engine/ThreeLib';

export async function createParticles(params: IParticlesParams, materialTextureService: TMaterialTextureService): Promise<IPoints> | never {
  const material: TMaterialWrapper = await materialTextureService.createAsync(params.material);

  const geometry: IBufferGeometry = new BufferGeometry();

  return new Points(geometry, material.entity);
}
