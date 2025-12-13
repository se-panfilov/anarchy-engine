import type { TModel3dPack, TWithModel3dFacadeEntities } from '@/Engine/Models3d/Models';

export function withModel3dFacadeEntities({ url, model, animations, options, clonedFrom }: TModel3dPack): TWithModel3dFacadeEntities {
  return {
    getUrl: () => url,
    getModel: () => model,
    getAnimations: () => animations,
    getOptions: () => options,
    getClonedFrom: () => clonedFrom
  };
}
