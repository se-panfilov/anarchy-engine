import type { ITexture } from '@/Engine/Wrappers';

export type ITextureService = {
  load: (urlsObj: Record<string, string>) => Record<string, ITexture>;
};
