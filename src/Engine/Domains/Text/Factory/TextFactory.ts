import type { IReactiveFactory } from '@/Engine/Domains/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Domains/Abstract';
import { configToParams } from '@/Engine/Domains/Text/Adapter';
import { TextType } from '@/Engine/Domains/Text/Constants';
import type { IText2dWrapper, IText3dWrapper, ITextFactory, ITextParams } from '@/Engine/Domains/Text/Models';
import { Text2dWrapper, Text3dWrapper } from '@/Engine/Domains/Text/Wrapper';

// TODO (S.Panfilov) extract builder
function textBuilder(params: ITextParams): IText2dWrapper | IText3dWrapper | never {
  if (params.type === TextType.Text3d) return Text3dWrapper(params);
  if (params.type === TextType.Text2d) return Text2dWrapper(params);
  throw new Error('Unsupported text type');
}

const factory: IReactiveFactory<IText2dWrapper | IText3dWrapper, ITextParams> = { ...ReactiveFactory(FactoryType.Text, textBuilder) };
export const TextFactory = (): ITextFactory => ({ ...factory, configToParams });
