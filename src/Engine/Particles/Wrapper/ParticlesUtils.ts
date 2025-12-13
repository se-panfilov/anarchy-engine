import type { Material } from 'three';
import { BufferGeometry, Points } from 'three';

import { materialService } from '@/Engine/Material';
import type { IParticlesParams } from '@/Engine/Particles/Models';
import type { IBufferGeometry, IPoints } from '@/Engine/ThreeLib';

export async function createParticles(params: IParticlesParams): Promise<IPoints> | never {
  const material: Material = await materialService.buildMaterialWithTextures(params.material);

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
