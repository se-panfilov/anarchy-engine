import type { TLoopService } from '@/Engine/Loop';

export type TTransformDriveServiceDependencies = Readonly<{
  loopService: TLoopService;
}>;
