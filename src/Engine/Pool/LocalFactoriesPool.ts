import { ControlsFactory } from '@Engine/Factories';
import { DestroyablePool } from '@Engine/Pool/DestroyablePool';

import type { IDestroyableFactories, ILocalFactoryPool, ILocalFactoryPoolParams } from './Models';

export function LocalFactoriesPool({ canvas, cameraRegistry }: ILocalFactoryPoolParams): ILocalFactoryPool {
  return DestroyablePool<IDestroyableFactories>({
    controlsFactory: ControlsFactory({ canvas, cameraRegistry })
  });
}
