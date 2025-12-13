import type { Observable } from 'rxjs';

import type { IDataTexture } from '@/Engine/EnvMap/Models';
import type { IDestroyable } from '@/Engine/Mixins';

export type IEnvMapService = Readonly<{
  load: (url: string) => Promise<IDataTexture>;
  added$: Observable<IDataTexture>;
}> &
  IDestroyable;
