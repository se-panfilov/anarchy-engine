import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import type { TMousePositionWatcher, TMousePositionWatcherDependencies, TMousePositionWatcherFactory, TMousePositionWatcherParams } from '@/Engine/Mouse/Models';
import { MousePositionWatcher } from '@/Engine/Mouse/Watchers';

const createMousePositionWatcher = (params: TMousePositionWatcherParams, { mouseLoop }: TMousePositionWatcherDependencies): TMousePositionWatcher => MousePositionWatcher(params, mouseLoop);

const factory: TReactiveFactory<TMousePositionWatcher, TMousePositionWatcherParams, TMousePositionWatcherDependencies> = ReactiveFactory(FactoryType.MousePositionWatcher, createMousePositionWatcher);
// eslint-disable-next-line functional/immutable-data
export const MousePositionWatcherFactory = (): TMousePositionWatcherFactory => Object.assign(factory, {});
