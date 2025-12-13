import type { TMilliseconds } from '@/Engine/Math/Types';

export type TLoopTimes = Readonly<{ delta: TMilliseconds; frameTime: TMilliseconds; elapsedTime: TMilliseconds }>;
