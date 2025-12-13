import type { TWithName, TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DPropConfig } from '@/Engine/ThreeLib';
import type { TOptional } from '@/Engine/Utils';

import type { TModel3dComplexProps } from './TModel3dComplexProps';
import type { TModel3dConfigMaterialConfig } from './TModel3dConfigMaterialConfig';

export type TModel3dComplexConfig = Omit<TModel3dComplexProps, 'scale' | 'position' | 'rotation' | 'material'> &
  Readonly<{ material?: TModel3dConfigMaterialConfig }> &
  // TODO MODELS: apply all TObject3DProps
  // We're not ready to add animations like this, so omit them for now
  Omit<TObject3DPropConfig, 'animations'> &
  TOptional<Pick<TObject3DPropConfig, 'position' | 'scale' | 'rotation'>> &
  TWithName &
  TWithReadonlyTags;
