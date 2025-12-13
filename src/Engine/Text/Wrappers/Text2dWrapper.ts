import { TextType } from '@/Engine/Text/Constants';
import type { TText2dWrapper, TTextParams, TTextServiceDependencies } from '@/Engine/Text/Models';
import { createTextWrapper } from '@/Engine/Text/Wrappers/TextWrapper';

export const Text2dWrapper = (params: TTextParams, dependencies: TTextServiceDependencies): TText2dWrapper => createTextWrapper(params, TextType.Text2d, dependencies);
