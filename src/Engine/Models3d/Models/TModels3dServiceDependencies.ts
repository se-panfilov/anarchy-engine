import type { TAnimationsService } from '@/Engine/Animations';
import type { TMaterialService } from '@/Engine/Material';

export type TModels3dServiceDependencies = Readonly<{
  animationsService: TAnimationsService;
  materialService: TMaterialService;
}>;
