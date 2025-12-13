import type { MeshBasicMaterialParameters, MeshStandardMaterialParameters } from 'three';
import { MeshBasicMaterial, MeshStandardMaterial } from 'three';

import type { ITextConfig, ITextParams } from '@/Engine/Domains/Text/Models';
import { isDefined } from '@/Engine/Utils';
import { EulerWrapper, Vector3Wrapper } from '@/Engine/Wrappers';

export function getParams(config: ITextConfig): ITextParams {
  const { position, rotation, scale, materialType, materialParams, ...rest } = config;
  const material: MeshBasicMaterial | MeshStandardMaterial | undefined = materialType ? getTextMaterial(materialType, materialParams) : undefined;

  let result: ITextParams = {
    ...rest,

    // TODO (S.Panfilov) CWP object3dAdapter//////////
    // TODO (S.Panfilov) debug (wtf layers?)
    // layers: config.layers ? (new Layers()).set(config.layers) : undefined,
    layers: undefined,

    // TODO (S.Panfilov) wtf animations?
    animations: [],

    position: Vector3Wrapper(position),
    rotation: isDefined(rotation) ? EulerWrapper(rotation) : undefined,
    scale: isDefined(scale) ? Vector3Wrapper(scale) : undefined
    // TODO (S.Panfilov) End object3dAdapter//////////
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
