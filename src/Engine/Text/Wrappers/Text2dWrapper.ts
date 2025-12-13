import { TextType } from '@/Engine/Text/Constants';
import type { ITextParams, TText2dWrapper } from '@/Engine/Text/Models';
import { createTextWrapper } from '@/Engine/Text/Wrappers/TextWrapper';

export const Text2dWrapper = (params: ITextParams): TText2dWrapper => createTextWrapper(params, TextType.Text2d);
