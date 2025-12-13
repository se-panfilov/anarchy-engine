import type { TWithName, TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DPropConfig } from '@/Engine/ThreeLib';
import type { TOptional } from '@/Engine/Utils';

import type { TModel3dProps } from './TModel3dProps';

export type TModel3dConfig = Omit<TModel3dProps, 'scale' | 'position' | 'rotation' | 'material'> &
  Readonly<{ material?: string }> &
  // TODO 8.0.0. MODELS: apply all TObject3DProps
  // We're not ready to add animations like this, so omit them for now
  Omit<TObject3DPropConfig, 'animations'> &
  TOptional<Pick<TObject3DPropConfig, 'position' | 'scale' | 'rotation'>> &
  TWithName &
  TWithReadonlyTags;
