import type { TextureTag } from '@/Engine/Domains/Texture/Constants';
import type { IWithReadonlyTags } from '@/Engine/Mixins';

import type { ITextureProps } from './ITextureProps';

export type ITextureParams = ITextureProps & IWithReadonlyTags<TextureTag>;
