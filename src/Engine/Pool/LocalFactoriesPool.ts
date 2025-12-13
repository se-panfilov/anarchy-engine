import { DestroyablePool } from '@Engine/Domains/Abstract';
import { ControlsFactory } from '@Engine/Domains/Controls';

import type { IDestroyableFactories, ILocalFactoryPool, ILocalFactoryPoolParams } from './Models';

export function LocalFactoriesPool({ canvas, cameraRegistry }: ILocalFactoryPoolParams): ILocalFactoryPool {
  return DestroyablePool<IDestroyableFactories>({
    controlsFactory: ControlsFactory({ canvas, cameraRegistry })
  });
}
