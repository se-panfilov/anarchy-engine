import type { ReplaySubject } from 'rxjs';

import type { ITexture } from './ITexture';
import type { ITextureParams } from './ITextureParams';

export type ITextureService = {
  load: (params: ITextureParams) => ITexture;
  sendMessage: (message: string) => void;
  messages$: ReplaySubject<string>;
};
