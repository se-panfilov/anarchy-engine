import { TextType } from '@Engine/Text/Constants';
import type { TText2dWrapper, TText3dTextureWrapper, TText3dWrapper, TTextAnyWrapper } from '@Engine/Text/Models';

export const isText2dWrapper = (text: TTextAnyWrapper): text is TText2dWrapper => text.type === TextType.Text2d;
export const isText3dWrapper = (text: TTextAnyWrapper): text is TText3dWrapper => text.type === TextType.Text3d;
export const isText3dTextureWrapper = (text: TTextAnyWrapper): text is TText3dTextureWrapper => text.type === TextType.Text3dTexture;
