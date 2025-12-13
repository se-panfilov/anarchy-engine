import type { TMaterialWrapper } from '@/Engine/Material';
import type { TObject3DParams, TObject3DProps } from '@/Engine/ThreeLib';

export type TModel3dProps = Readonly<{
  url: string;
  options: TModel3dLoadOptions;
  // TODO 8.0.0. MODELS: override model's material is this field is set
  material?: TMaterialWrapper;
}> &
  // TODO 8.0.0. MODELS: apply all TObject3DProps
  // We're not ready to add animations like this, so omit them for now
  Omit<TObject3DProps, 'animations' | 'position' | 'scale' | 'rotation'> &
  Pick<TObject3DParams, 'position' | 'scale' | 'rotation'>;
