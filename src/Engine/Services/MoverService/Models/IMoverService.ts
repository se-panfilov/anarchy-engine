import type { IActorWrapper } from '@/Engine/Domains/Actor';
import type { IWithCoords3 } from '@/Engine/Mixins';
import type { IAnimationParams } from '@/Engine/Services/MoverService/Models/IAnimationParams';

export type IMoverService = Readonly<{
  goToPosition: (actor: IActorWrapper, targetPosition: Partial<IWithCoords3>, params: IAnimationParams) => Promise<void>;
}>;
