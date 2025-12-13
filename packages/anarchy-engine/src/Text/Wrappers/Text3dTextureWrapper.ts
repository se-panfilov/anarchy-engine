import { TextType } from '@Anarchy/Engine/Text/Constants';
import type { TText3dTextureWrapper, TTextParams, TTextServiceDependencies } from '@Anarchy/Engine/Text/Models';
import { createTextTextureWrapper } from '@Anarchy/Engine/Text/Wrappers/TextTextureWrapper';

export const Text3dTextureWrapper = (params: TTextParams, dependencies: TTextServiceDependencies): TText3dTextureWrapper => createTextTextureWrapper(params, TextType.Text3dTexture, dependencies);
