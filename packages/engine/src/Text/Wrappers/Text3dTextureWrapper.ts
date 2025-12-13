import { TextType } from '@/Text/Constants';
import type { TText3dTextureWrapper, TTextParams, TTextServiceDependencies } from '@/Text/Models';
import { createTextTextureWrapper } from '@/Text/Wrappers/TextTextureWrapper';

export const Text3dTextureWrapper = (params: TTextParams, dependencies: TTextServiceDependencies): TText3dTextureWrapper => createTextTextureWrapper(params, TextType.Text3dTexture, dependencies);
