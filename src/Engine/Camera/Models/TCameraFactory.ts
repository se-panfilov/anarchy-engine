import type { TReactiveFactoryWithDependencies } from '@/Engine/Abstract';

import type { TCameraParams } from './TCameraParams';
import type { TCameraServiceDependencies } from './TCameraServiceDependencies';
import type { TCameraWrapper } from './TCameraWrapper';
import type { TParamsFromConfigCamera } from './TParamsFromConfigCamera';

export type TCameraFactory = TReactiveFactoryWithDependencies<TCameraWrapper, TCameraParams, TCameraServiceDependencies> & TParamsFromConfigCamera;
