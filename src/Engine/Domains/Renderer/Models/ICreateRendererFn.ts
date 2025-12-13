import type { ICreateFN } from '@Engine/Factories';
import type { IRendererParams, IRendererWrapper } from '@Engine/Domains/Renderer/Models';

export type ICreateRendererFn = ICreateFN<IRendererWrapper, IRendererParams>;
