import type { IWithReadonlyTags } from '@/Engine/Mixins';
import type { IObject3DParams } from '@/Engine/ThreeLib';

import type { IActorProps } from './IActorProps';

export type IActorParams = IActorProps & IObject3DParams & IWithReadonlyTags<string>;
