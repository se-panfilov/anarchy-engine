import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { ambientContext } from '@/Engine/Context';
import type { IRendererFactory, IRendererParams, IRendererWrapper } from '@/Engine/Renderer/Models';
import { RendererWrapper } from '@/Engine/Renderer/Wrappers';

const create = (params: IRendererParams): IRendererWrapper => RendererWrapper(params, ambientContext.screenSizeWatcher);
const factory: TReactiveFactory<IRendererWrapper, IRendererParams> = { ...ReactiveFactory(FactoryType.Renderer, create) };
export const RendererFactory = (): IRendererFactory => ({ ...factory });
