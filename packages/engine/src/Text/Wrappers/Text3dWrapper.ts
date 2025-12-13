import { TextType } from '@/Engine/Text/Constants';
import type { TText3dWrapper, TTextParams, TTextServiceDependencies } from '@/Engine/Text/Models';
import { createTextWrapper } from '@/Engine/Text/Wrappers/TextWrapper';

export const Text3dWrapper = (params: TTextParams, dependencies: TTextServiceDependencies): TText3dWrapper => createTextWrapper(params, TextType.Text3d, dependencies);
