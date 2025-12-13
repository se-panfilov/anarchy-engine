import type { Material } from 'three';
import { BufferGeometry } from 'three';

import { materialService } from '@/Engine/Material';
import type { IMesh, IParticlesParams } from '@/Engine/Particles/Models';
import { textureService } from '@/Engine/Texture';
import { isDefined } from '@/Engine/Utils';

export async function createParticles(params: IParticlesParams): Promise<IMesh> | never {
  const material: Material = await getMaterial(params);

  const particlesGeometry = new BufferGeometry();
  const count: number = 50000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  throw new Error('Cannot create Particles: unknown particles type');
}

async function getMaterial(params: IParticlesParams): Promise<Material> {
  let textures;
  if (isDefined(params.material.textures)) textures = await textureService.load(params.material).all();
  const material: Material = materialService.buildMaterial(params.material.type, params.material.params, textures);

  return material;
}
