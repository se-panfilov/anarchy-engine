import type { TMaterialWrapper } from '@/Engine/Material';
import type { TObject3DParams } from '@/Engine/ThreeLib';

import type { TModel3dProps } from './TModel3dProps';

export type TModel3dParams = TModel3dProps & Readonly<{ material?: TMaterialWrapper }> & Pick<TObject3DParams, 'position' | 'scale' | 'rotation'>;
