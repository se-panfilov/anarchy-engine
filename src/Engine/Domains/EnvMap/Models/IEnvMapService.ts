import type { Observable } from 'rxjs';

import type { IDataTexture } from '@/Engine/Domains/EnvMap/Models';

export type IEnvMapService = Readonly<{
  load: (url: string) => Promise<IDataTexture>;
  added$: Observable<IDataTexture>;
}>;
