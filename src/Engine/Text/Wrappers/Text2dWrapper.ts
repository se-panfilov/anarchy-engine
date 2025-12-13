import { TextType } from '@/Engine/Text/Constants';
import type { IText2dWrapper, ITextParams } from '@/Engine/Text/Models';
import { createTextWrapper } from '@/Engine/Text/Wrappers/TextWrapper';

export const Text2dWrapper = (params: ITextParams): IText2dWrapper => createTextWrapper(params, TextType.Text2d);
