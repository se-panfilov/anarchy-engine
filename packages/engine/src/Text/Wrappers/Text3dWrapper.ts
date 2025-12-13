import { TextType } from '@/Text/Constants';
import type { TText3dWrapper, TTextParams, TTextServiceDependencies } from '@/Text/Models';
import { createTextWrapper } from '@/Text/Wrappers/TextWrapper';

export const Text3dWrapper = (params: TTextParams, dependencies: TTextServiceDependencies): TText3dWrapper => createTextWrapper(params, TextType.Text3d, dependencies);
