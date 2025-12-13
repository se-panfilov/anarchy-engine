import type { ICreateFN } from '@Engine/Factories';
import type { RendererWrapper } from '@Engine/Wrappers';
import type { IRendererParams } from '@Engine/Models';

export type ICreateRendererFn = ICreateFN<ReturnType<typeof RendererWrapper>, IRendererParams>;
