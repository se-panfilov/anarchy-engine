import type { TLoop } from '@Engine/Loop/Models';

export type TRenderLoop = TLoop & { __brand: 'render_loop' };
