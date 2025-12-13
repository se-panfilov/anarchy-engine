import type { TAudioService } from '@/Engine/Audio';

export type TCameraServiceDependencies = Readonly<{
  audioService: TAudioService;
}>;
