import type { IMaterialTexturePack } from '@/Engine/Texture/Models';

import type { IMaterialProps } from './IMaterialProps';

export type IWitMaterialProperty = Readonly<{ material: IMaterialProps<IMaterialTexturePack> }>;
