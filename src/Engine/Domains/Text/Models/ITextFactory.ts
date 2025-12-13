import type { IParamsFromConfig, IReactiveFactory } from '@/Engine/Domains/Abstract';
import type { IText2dWrapper, IText3dWrapper, ITextConfig, ITextParams } from '@/Engine/Domains/Text/Models';
import type { IDestroyable } from '@/Engine/Mixins';

export type ITextFactory = IReactiveFactory<IText2dWrapper | IText3dWrapper, ITextParams> & IParamsFromConfig<ITextConfig, ITextParams> & IDestroyable;
