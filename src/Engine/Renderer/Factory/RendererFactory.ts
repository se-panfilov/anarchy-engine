import type { IReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { ambientContext } from '@/Engine/Context';
import type { IRendererFactory, IRendererParams, IRendererWrapper } from '@/Engine/Renderer/Models';
import { RendererWrapper } from '@/Engine/Renderer/Wrapper';

const create = (params: IRendererParams): IRendererWrapper => RendererWrapper(params, ambientContext.screenSizeWatcher);
const factory: IReactiveFactory<IRendererWrapper, IRendererParams> = { ...ReactiveFactory(FactoryType.Renderer, create) };
export const RendererFactory = (): IRendererFactory => ({ ...factory });
