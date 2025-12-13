import type { TModel3dComplexEntities, TWithModel3dComplexFacadeEntities } from '@/Engine/Models3d/Models';

export function withModel3dComplexFacadeEntities({ url, model, animations, options, clonedFrom, mixer, actions }: TModel3dComplexEntities): TWithModel3dComplexFacadeEntities {
  return {
    getUrl: () => url,
    getModel: () => model,
    getAnimations: () => animations,
    getMixer: () => mixer,
    getActions: () => actions,
    getOptions: () => options,
    getClonedFrom: () => clonedFrom
  };
}
