import type { IActorWrapper } from '@/Engine/Domains/Actor';
import type { IAnimationParams } from '@/Engine/Services/MoverService/Models/IAnimationParams';

import type { IKeyframeDestination } from './IKeyframeDestination';
import type { IMoveDestination } from './IMoveDestination';

export type IMoverService = Readonly<{
  goToPosition: (actor: IActorWrapper, destination: IMoveDestination, params: IAnimationParams) => Promise<void>;
  goByPath: (actor: IActorWrapper, path: ReadonlyArray<IKeyframeDestination>, params: IAnimationParams) => Promise<void>;
}>;
