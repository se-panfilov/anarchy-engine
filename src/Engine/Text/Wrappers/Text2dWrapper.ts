import { TextType } from '@/Engine/Text/Constants';
import type { TText2dWrapper, TTextDependencies, TTextParams } from '@/Engine/Text/Models';
import { createTextWrapper } from '@/Engine/Text/Wrappers/TextWrapper';

export const Text2dWrapper = (params: TTextParams, dependencies: TTextDependencies): TText2dWrapper => createTextWrapper(params, TextType.Text2d, dependencies);
