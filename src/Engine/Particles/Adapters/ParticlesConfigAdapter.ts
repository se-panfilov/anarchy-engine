// import type { TMaterialWrapper } from '@/Engine/Material';
import type { TParticlesConfig, TParticlesParams } from '@/Engine/Particles/Models';
import { configToParamsObject3d } from '@/Engine/ThreeLib';
// import { isDefined, isNotDefined } from '@/Engine/Utils';

export function configToParams(config: TParticlesConfig): TParticlesParams | never {
  // const { position, rotation, layers, scale, material: materialConfig, ...rest } = config;
  const { position, rotation, layers, scale, ...rest } = config;
  // const { type: materialType, ...restMaterialParams } = materialConfigToParams({ ...material.params, type: material.type });

  // TODO 9.0.0.: material should be loaded someting like this (align with actors's adapter)
  // if (isNotDefined(materialConfig)) throw new Error('Material must be defined for primitive model, but it is not.');
  // const material = (isDefined(materialConfig) ? materialService.getMaterialWithOverrides(materialConfig) : undefined) as TMaterialWrapper;

  return {
    ...rest,
    // TODO debug
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    material: undefined as any,
    // TODO 9.0.0.: material should be loaded with overrides from material registry
    // material: { type: materialType, params: { ...restMaterialParams }, textures: material.textures } satisfies TMaterialPackParams<TMaterialTexturePack>,
    ...configToParamsObject3d({ position, rotation, scale, layers })
  };
}
