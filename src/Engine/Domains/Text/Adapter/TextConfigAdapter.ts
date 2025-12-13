import type { MeshBasicMaterialParameters, MeshStandardMaterialParameters  } from 'three';
import { MeshBasicMaterial, MeshStandardMaterial } from 'three';

import type { ITextConfig, ITextParams } from '@/Engine/Domains/Text/Models';
import { isDefined } from '@/Engine/Utils';
import { Vector3Wrapper } from '@/Engine/Wrappers';

export function getParams(config: ITextConfig): ITextParams {
  const { position, materialType, materialParams, ...rest } = config;
  const material: MeshBasicMaterial | MeshStandardMaterial | undefined = materialType ? getTextMaterial(materialType, materialParams) : undefined;

  let result: ITextParams = {
    ...rest,
    position: Vector3Wrapper(position)
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
