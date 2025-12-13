import type { TAudioService } from '@/Engine/Audio';
import type { TScreenService } from '@/Engine/Screen';

export type TCameraServiceDependencies = Readonly<{
  audioService: TAudioService;
  screenService: TScreenService;
}>;
