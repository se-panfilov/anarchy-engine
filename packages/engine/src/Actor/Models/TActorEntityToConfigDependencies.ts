import type { TModels3dService } from '@Engine/Models3d';

export type TActorEntityToConfigDependencies = Readonly<{
  models3dService: TModels3dService;
}>;
