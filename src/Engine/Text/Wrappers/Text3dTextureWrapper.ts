import { TextType } from '@/Engine/Text/Constants';
import type { TText3dTextureWrapper, TTextParams } from '@/Engine/Text/Models';
import { createTextTextureWrapper } from '@/Engine/Text/Wrappers/TextTextureWrapper';

export const Text3dTextureWrapper = (params: TTextParams): TText3dTextureWrapper => createTextTextureWrapper(params, TextType.Text3dTexture);
