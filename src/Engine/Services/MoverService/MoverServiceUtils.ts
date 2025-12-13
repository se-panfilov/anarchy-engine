import type { IActorWrapper } from '@/Engine/Domains/Actor';
import type { IFullKeyframeDestination, IKeyframeDestination, IMoveDestination } from '@/Engine/Services';

export function addMissingCoords<T extends IKeyframeDestination | IMoveDestination>(destination: T, actor: IActorWrapper): IKeyframeDestination | Required<IMoveDestination> {
  return { ...destination, x: destination.x ?? actor.getX(), y: destination.y ?? actor.getY(), z: destination.z ?? actor.getZ() };
}

export function prepareDestination(destination: IMoveDestination, actor: IActorWrapper): Required<IMoveDestination> {
  return addMissingCoords(destination, actor) as Required<IMoveDestination>;
}

export function preparePathList(list: ReadonlyArray<IKeyframeDestination>, actor: IActorWrapper): ReadonlyArray<IFullKeyframeDestination> {
  return list.map((destination: IKeyframeDestination) => addMissingCoords(destination, actor) as IFullKeyframeDestination);
}
