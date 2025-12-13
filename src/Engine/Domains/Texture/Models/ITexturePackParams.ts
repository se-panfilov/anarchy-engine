import type { ITextureParams } from '@/Engine/Domains/Texture';

export type ITexturePackParams = Readonly<{
  url: string;
  params?: ITextureParams;
}>;
