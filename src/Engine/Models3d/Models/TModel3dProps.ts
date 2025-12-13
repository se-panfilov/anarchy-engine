import type { TMaterialPackParams, TMaterialTexturePack } from '@/Engine/MaterialTexturePack';
import type { TObject3DParams, TObject3DProps } from '@/Engine/ThreeLib';

import type { TModel3dLoadOptions } from './TModel3dLoadOptions';

export type TModel3dProps = Readonly<{
  url: string;
  options: TModel3dLoadOptions;
  // TODO (S.Panfilov) CWP override model's material is this field is set
  material?: TMaterialPackParams<TMaterialTexturePack>;
}> &
  // TODO (S.Panfilov) CWP apply all TObject3DProps
  // We're not ready to add animations like this, so omit them for now
  Omit<TObject3DProps, 'animations' | 'position' | 'scale' | 'rotation'> &
  Pick<TObject3DParams, 'position' | 'scale' | 'rotation'>;
