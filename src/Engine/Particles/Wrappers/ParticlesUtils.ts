import { BufferGeometry, Points } from 'three';

import type { TMaterialWrapper } from '@/Engine/Material';
import type { TMaterialTextureService } from '@/Engine/MaterialTexturePack';
import type { TParticlesParams } from '@/Engine/Particles/Models';
import type { TBufferGeometry, TPoints } from '@/Engine/ThreeLib';

export async function createParticles(params: TParticlesParams, materialTextureService: TMaterialTextureService): Promise<TPoints> | never {
  const material: TMaterialWrapper = await materialTextureService.createAsync(params.material);

  const geometry: TBufferGeometry = new BufferGeometry();

  return new Points(geometry, material.entity);
}
