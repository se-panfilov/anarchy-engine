import type { IWrapper } from '@/Engine/Domains/Abstract';
import type { TextureTag } from '@/Engine/Domains/Texture/Constants';
import type { ITexture } from '@/Engine/Domains/ThreeLib';
import type { IWithTags } from '@/Engine/Mixins';

export type ITextureWrapper = IWrapper<ITexture> & IWithTags<TextureTag>;
