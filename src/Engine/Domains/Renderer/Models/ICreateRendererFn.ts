import type { IRendererParams, IRendererWrapper } from '@Engine/Domains/Renderer/Models';
import type { ICreateFN } from '@Engine/Factories';

export type ICreateRendererFn = ICreateFN<IRendererWrapper, IRendererParams>;
