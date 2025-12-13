import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { ambientContext } from '@/Engine/Context';
import type { TRendererFactory, TRendererParams, TRendererWrapper } from '@/Engine/Renderer/Models';
import { RendererWrapper } from '@/Engine/Renderer/Wrappers';

const create = (params: TRendererParams): TRendererWrapper => RendererWrapper(params, ambientContext.screenSizeWatcher);
const factory: TReactiveFactory<TRendererWrapper, TRendererParams> = ReactiveFactory(FactoryType.Renderer, create);
export const RendererFactory = (): TRendererFactory => ({ ...factory });
