import type { TWithName, TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DParams } from '@/Engine/ThreeLib';

import type { TModel3dOptions } from './TModel3dOptions';

export type TModel3dProps = Readonly<{
  options?: TModel3dOptions;
}> &
  // We're not ready to add animations like this, so omit them for now
  Omit<TObject3DParams, 'animations' | 'position' | 'scale' | 'rotation'> &
  Pick<TObject3DParams, 'position' | 'scale' | 'rotation'> &
  TWithName &
  TWithReadonlyTags;
