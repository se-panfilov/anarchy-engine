import { TextType } from '@hellpig/anarchy-engine/Text/Constants';
import type { TText3dTextureWrapper, TTextParams, TTextServiceDependencies } from '@hellpig/anarchy-engine/Text/Models';
import { createTextTextureWrapper } from '@hellpig/anarchy-engine/Text/Wrappers/TextTextureWrapper';

export const Text3dTextureWrapper = (params: TTextParams, dependencies: TTextServiceDependencies): TText3dTextureWrapper => createTextTextureWrapper(params, TextType.Text3dTexture, dependencies);
