import { TextType } from '@/Engine/Text/Constants';
import type { IText2dWrapper, IText3dWrapper, ITextAnyWrapper } from '@/Engine/Text/Models';

export const isText2dWrapper = (text: ITextAnyWrapper): text is IText2dWrapper => text.type === TextType.Text2d;
export const isText3dWrapper = (text: ITextAnyWrapper): text is IText3dWrapper => text.type === TextType.Text3d;
