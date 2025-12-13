import { TextType } from '@/Engine/Domains/Text/Constants';
import type { IText2dWrapper, ITextParams } from '@/Engine/Domains/Text/Models';
import { createTextWrapper } from '@/Engine/Domains/Text/Wrapper/TextWrapper';

export const Text2dWrapper = (params: ITextParams): IText2dWrapper => createTextWrapper(params, TextType.Text2d);
