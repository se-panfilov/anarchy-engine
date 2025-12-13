import type { ICreateFN } from '@Engine/Domains/Abstract';
import type { IRendererParams, IRendererWrapper } from '@Engine/Domains/Renderer';

export type ICreateRendererFn = ICreateFN<IRendererWrapper, IRendererParams>;
