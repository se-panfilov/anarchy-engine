import { TextType } from '@/Text/Constants';
import type { TText2dWrapper, TTextParams, TTextServiceDependencies } from '@/Text/Models';
import { createTextWrapper } from '@/Text/Wrappers/TextWrapper';

export const Text2dWrapper = (params: TTextParams, dependencies: TTextServiceDependencies): TText2dWrapper => createTextWrapper(params, TextType.Text2d, dependencies);
