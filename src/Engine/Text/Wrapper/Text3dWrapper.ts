import { TextType } from '@/Engine/Text/Constants';
import type { IText3dWrapper, ITextParams } from '@/Engine/Text/Models';
import { createTextWrapper } from '@/Engine/Text/Wrapper/TextWrapper';

export const Text3dWrapper = (params: ITextParams): IText3dWrapper => createTextWrapper(params, TextType.Text3d);
