import { TextType } from '@hellpig/anarchy-engine/Text/Constants';
import type { TText3dWrapper, TTextParams, TTextServiceDependencies } from '@hellpig/anarchy-engine/Text/Models';
import { createTextWrapper } from '@hellpig/anarchy-engine/Text/Wrappers/TextWrapper';

export const Text3dWrapper = (params: TTextParams, dependencies: TTextServiceDependencies): TText3dWrapper => createTextWrapper(params, TextType.Text3d, dependencies);
