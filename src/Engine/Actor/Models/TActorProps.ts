import type { ActorDrive } from '@/Engine/Actor/Constants';
import type { TWithName, TWithReadonlyTags } from '@/Engine/Mixins';

export type TActorProps = Readonly<{
  drive: ActorDrive;
}> &
  TWithName &
  TWithReadonlyTags;
