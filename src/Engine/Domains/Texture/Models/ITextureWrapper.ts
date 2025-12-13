import type { IWrapper } from '@/Engine/Domains/Abstract';
import type { IWithTags } from '@/Engine/Mixins';

import type { ITexture } from './ITexture';

export type ITextureWrapper = IWrapper<ITexture> & IWithTags<string>;
