import type { TScreenService } from '@/Engine/Screen';

export type TRendererWrapperDependencies = Readonly<{
  screenService: TScreenService;
}>;
