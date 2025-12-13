import type { CreateFN } from '@Engine/Factories';
import type { RendererWrapper } from '@Engine/Wrappers';
import type { IRendererParams } from '@Engine/Models';

export type ICreateRendererFn = CreateFN<ReturnType<typeof RendererWrapper>, IRendererParams>;
