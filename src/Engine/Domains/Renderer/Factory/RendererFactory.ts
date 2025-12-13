import { ambientContext } from '@Engine/Context';
import type { IReactiveFactory } from '@Engine/Domains/Abstract';
import { FactoryType, ReactiveFactory } from '@Engine/Domains/Abstract';

import type { IRendererFactory, IRendererParams, IRendererWrapper } from '@/Engine/Domains/Renderer/Models';
import { RendererWrapper } from '@/Engine/Domains/Renderer/Wrapper';

const create = (params: IRendererParams): IRendererWrapper => RendererWrapper(params, ambientContext.screenSizeWatcher);
const factory: IReactiveFactory<IRendererWrapper, IRendererParams> = { ...ReactiveFactory(FactoryType.Renderer, create) };
export const RendererFactory = (): IRendererFactory => ({ ...factory });
