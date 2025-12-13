import { TextType } from '@/Engine/Domains/Text/Constants';
import type { IText3dWrapper, ITextParams } from '@/Engine/Domains/Text/Models';
import { createTextWrapper } from '@/Engine/Domains/Text/Wrapper/TextWrapper';

export const Text3dWrapper = (params: ITextParams): IText3dWrapper => createTextWrapper(params, TextType.Text3d);
