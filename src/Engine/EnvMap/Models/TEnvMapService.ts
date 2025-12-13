import type { Observable } from 'rxjs';

import type { TDataTexture } from '@/Engine/EnvMap/Models';

export type TEnvMapService = Readonly<{
  load: (url: string) => Promise<TDataTexture>;
  added$: Observable<TDataTexture>;
}>;
