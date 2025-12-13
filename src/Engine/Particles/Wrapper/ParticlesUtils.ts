import type { Material } from 'three';
import { BufferGeometry, Points } from 'three';

import { materialService } from '@/Engine/Material';
import type { IParticlesParams } from '@/Engine/Particles/Models';
import { textureService } from '@/Engine/Texture';
import type { IBufferGeometry, IPoints } from '@/Engine/ThreeLib';
import { isDefined } from '@/Engine/Utils';

export async function createParticles(params: IParticlesParams): Promise<IPoints> | never {
  const material: Material = await getMaterial(params);

  const geometry: IBufferGeometry = new BufferGeometry();

  //   material.then((material: PointsMaterial): void => {
  //     // eslint-disable-next-line functional/immutable-data
  //     material.size = 0.1
  //     // eslint-disable-next-line functional/immutable-data
  //     material.sizeAttenuation = true
  //
  //     material.color = new Color('#ff88cc')
  //
  //     material.transparent = true
  //     material.alphaMap = particleTexture
  // // material.alphaTest = 0.01
  // // material.depthTest = false
  //     material.depthWrite = false
  //     material.blending = AdditiveBlending
  //
  //     material.vertexColors = true
  //   });

  return new Points(geometry, material);
}

async function getMaterial(params: IParticlesParams): Promise<Material> {
  let textures;
  if (isDefined(params.material.textures)) textures = await textureService.load(params.material).all();
  const material: Material = materialService.buildMaterial(params.material.type, params.material.params, textures);

  return material;
}
