import { TextType } from '@Anarchy/Engine/Text/Constants';
import type { TText2dWrapper, TTextParams, TTextServiceDependencies } from '@Anarchy/Engine/Text/Models';
import { createTextWrapper } from '@Anarchy/Engine/Text/Wrappers/TextWrapper';

export const Text2dWrapper = (params: TTextParams, dependencies: TTextServiceDependencies): TText2dWrapper => createTextWrapper(params, TextType.Text2d, dependencies);
