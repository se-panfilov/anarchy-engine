import type { TWithNameRequired, TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DParams, TObject3DProps } from '@/Engine/ThreeLib';

import type { TModel3dOptions } from './TModel3dOptions';

// TODO 8.0.0. MODELS: apply all TObject3DProps
export type TModel3dProps = Readonly<{
  options?: TModel3dOptions;
}> &
  // We're not ready to add animations like this, so omit them for now
  Omit<TObject3DProps, 'animations' | 'position' | 'scale' | 'rotation'> &
  Pick<TObject3DParams, 'position' | 'scale' | 'rotation'> &
  TWithNameRequired &
  TWithReadonlyTags;
