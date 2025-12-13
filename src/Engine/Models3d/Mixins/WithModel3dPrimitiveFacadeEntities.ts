import type { TModel3dPrimitiveEntities, TWithModel3dFacadeEntities } from '@/Engine/Models3d/Models';

export function withModel3dPrimitiveFacadeEntities({ model, options, clonedFrom, primitive }: TModel3dPrimitiveEntities): TWithModel3dFacadeEntities {
  return {
    getPrimitive: () => primitive,
    getModel: () => model,
    getOptions: () => options,
    getClonedFrom: () => clonedFrom
  };
}
