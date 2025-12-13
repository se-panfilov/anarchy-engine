import type { TModel3dEntities, TWithModel3dFacadeEntities } from '@/Engine/Models3d/Models';

export function withModel3dFacadeEntities({ url, model, animations, options, clonedFrom, mixer, actions }: TModel3dEntities): TWithModel3dFacadeEntities {
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
