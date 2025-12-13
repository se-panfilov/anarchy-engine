import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { ambientContext } from '@/Engine/Context';
import type { IRendererFactory, IRendererParams, TRendererWrapper } from '@/Engine/Renderer/Models';
import { RendererWrapper } from '@/Engine/Renderer/Wrappers';

const create = (params: IRendererParams): TRendererWrapper => RendererWrapper(params, ambientContext.screenSizeWatcher);
const factory: TReactiveFactory<TRendererWrapper, IRendererParams> = { ...ReactiveFactory(FactoryType.Renderer, create) };
export const RendererFactory = (): IRendererFactory => ({ ...factory });
