import type { TextureTag } from '@/Engine/Domains/Texture/Constants';
import type { IObject3DPropConfig } from '@/Engine/Domains/ThreeLib';
import type { IWithReadonlyTags } from '@/Engine/Mixins';

import type { ITextureProps } from './ITextureProps';

export type ITextureConfig = Omit<ITextureProps, 'color' | 'strokeColor' | 'material'> &
  Readonly<{
    url: string;
  }> &
  IObject3DPropConfig &
  IWithReadonlyTags<TextureTag>;
