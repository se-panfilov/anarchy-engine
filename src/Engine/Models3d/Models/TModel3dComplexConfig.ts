import type { TMaterialPackConfig, TMaterialTexturePack } from '@/Engine/MaterialTexturePack';
import type { TWithName, TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DPropConfig } from '@/Engine/ThreeLib';

import type { TModel3dComplexProps } from './TModel3dComplexProps';

export type TModel3dComplexConfig = Omit<TModel3dComplexProps, 'scale' | 'position' | 'rotation' | 'material'> &
  Readonly<{
    material?: TMaterialPackConfig<TMaterialTexturePack>;
  }> &
  // TODO (S.Panfilov) CWP apply all TObject3DProps
  // We're not ready to add animations like this, so omit them for now
  Omit<TObject3DPropConfig, 'animations'> &
  Pick<TObject3DPropConfig, 'position' | 'scale' | 'rotation'> &
  TWithName &
  TWithReadonlyTags;
