import type { TextureTag } from '@/Engine/Domains/Texture/Constants';
import type { IObject3DParams } from '@/Engine/Domains/ThreeLib';
import type { IWithReadonlyTags } from '@/Engine/Mixins';

import type { ITextureProps } from './ITextureProps';

export type ITextureParams = ITextureProps & IObject3DParams & IWithReadonlyTags<TextureTag>;
