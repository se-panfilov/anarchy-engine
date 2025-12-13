import type { BBox } from 'rbush';

import type { TActorWrapperAsync } from '@/Engine/Actor';

export type TSpatialCell = BBox & Readonly<{ objects: Array<TActorWrapperAsync> }>;
