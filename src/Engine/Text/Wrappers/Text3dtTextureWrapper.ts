import { TextType } from '@/Engine/Text/Constants';
import type { TText3dWrapper, TTextParams } from '@/Engine/Text/Models';
import { createTextWrapper } from '@/Engine/Text/Wrappers/TextWrapper';

export const Text3dtTextureWrapper = (params: TTextParams): TText3dWrapper => createTextWrapper(params, TextType.Text3dTexture);
