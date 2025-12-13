import type { TObject3DPropConfig } from '@/Engine/ThreeLib';

import type { TModel3dProps } from './TModel3dProps';

export type TModel3dConfig = Omit<TModel3dProps, 'scale' | 'position' | 'rotation'> & Pick<TObject3DPropConfig, 'position' | 'scale' | 'rotation'> & Readonly<{ material?: string }>;
