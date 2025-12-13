import type { Material } from 'three';
import { BufferAttribute, BufferGeometry } from 'three';

import { materialService } from '@/Engine/Material';
import type { IParticlesParams } from '@/Engine/Particles/Models';
import { textureService } from '@/Engine/Texture';
import type { IBufferGeometry } from '@/Engine/ThreeLib';
import { isDefined } from '@/Engine/Utils';

export async function createParticles(params: IParticlesParams): Promise<IBufferGeometry> | never {
  const material: Material = await getMaterial(params);

  const particlesGeometry: IBufferGeometry = new BufferGeometry();
  const count: number = 50000;

  // TODO (S.Panfilov) should be set via methods of the particular wrapper, not via config/params
  // const positions: Float32Array = new Float32Array(count * 3);
  // const colors: Float32Array = new Float32Array(count * 3);
  //
  // for(let i = 0; i < count * 3; i++)
  // {
  //   positions[i] = (Math.random() - 0.5) * 10
  //   colors[i] = Math.random()
  // }

  return particlesGeometry;
}

async function getMaterial(params: IParticlesParams): Promise<Material> {
  let textures;
  if (isDefined(params.material.textures)) textures = await textureService.load(params.material).all();
  const material: Material = materialService.buildMaterial(params.material.type, params.material.params, textures);

  return material;
}
