import type { MeshBasicMaterialParameters, MeshStandardMaterialParameters } from 'three';
import { MeshBasicMaterial, MeshStandardMaterial } from 'three';

import type { ITextConfig, ITextParams } from '@/Engine/Domains/Text/Models';
import { configToParamsObject3d } from '@/Engine/Domains/ThreeLib';
import { isDefined } from '@/Engine/Utils';

export function configToParams(config: ITextConfig): ITextParams {
  const { position, rotation, scale, layers, animations, materialType, materialParams, ...rest } = config;
  const material: MeshBasicMaterial | MeshStandardMaterial | undefined = materialType ? getTextMaterial(materialType, materialParams) : undefined;

  let result: ITextParams = {
    ...rest,
    ...configToParamsObject3d({ position, rotation, scale, layers, animations })
  };

  if (isDefined(material)) result = { ...result, material };

  return result;
}

function getTextMaterial(
  materialType: 'MeshBasicMaterial' | 'MeshStandardMaterial',
  materialParams?: MeshBasicMaterialParameters | MeshStandardMaterialParameters
): MeshBasicMaterial | MeshStandardMaterial {
  if (materialType === 'MeshBasicMaterial') {
    return new MeshBasicMaterial(materialParams);
  }
  return new MeshStandardMaterial(materialParams);
}
