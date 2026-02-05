import { TextType } from '@hellpig/anarchy-engine/Text/Constants';
import type { TText2dWrapper, TTextParams, TTextServiceDependencies } from '@hellpig/anarchy-engine/Text/Models';
import { createTextWrapper } from '@hellpig/anarchy-engine/Text/Wrappers/TextWrapper';

export const Text2dWrapper = (params: TTextParams, dependencies: TTextServiceDependencies): TText2dWrapper => createTextWrapper(params, TextType.Text2d, dependencies);
