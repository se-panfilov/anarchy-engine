import type { IWrapper } from '@/Engine/Domains/Abstract';
import type { TextureTag } from '@/Engine/Domains/Texture/Constants';
import type { ITexture } from '@/Engine/Domains/ThreeLib';
import type { IWithTags } from '@/Engine/Mixins';

import type { ITextureAccessors } from './ITextureAccessors';

export type ITextureWrapper = IWrapper<ITexture> & ITextureAccessors & IWithTags<TextureTag>;
