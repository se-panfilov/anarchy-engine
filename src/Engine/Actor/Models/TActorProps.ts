import type { ActorDriver } from '@/Engine/Actor/Constants';
import type { TWithName, TWithReadonlyTags } from '@/Engine/Mixins';

export type TActorProps = Readonly<{
  driver: ActorDriver;
}> &
  TWithName &
  TWithReadonlyTags;
