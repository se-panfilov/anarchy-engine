import type { TWithNameRequired, TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DParams, TObject3DProps } from '@/Engine/ThreeLib';

// TODO 8.0.0. MODELS: apply all TObject3DProps
// We're not ready to add animations like this, so omit them for now
export type TModel3dProps = Omit<TObject3DProps, 'animations' | 'position' | 'scale' | 'rotation'> & Pick<TObject3DParams, 'position' | 'scale' | 'rotation'> & TWithNameRequired & TWithReadonlyTags;
