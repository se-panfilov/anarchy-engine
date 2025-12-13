import type { Subscription } from 'rxjs';
import { Subject } from 'rxjs';

import type { TAbstractWrapper } from '@/Engine/Abstract';
import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TActor } from '@/Engine/Actor';
import { entityToConfigSpatialCell } from '@/Engine/Spatial/Adapters';
import type { TSpatialCell, TSpatialCellParams, TSpatialCellSerializedData, TSpatialCellWrapper } from '@/Engine/Spatial/Models';

export function SpatialCellWrapper(params: TSpatialCellParams): TSpatialCellWrapper {
  const entity: TSpatialCell = {
    minX: params.minX,
    minY: params.minZ,
    maxX: params.maxX,
    maxY: params.maxZ,
    id: `spatial_cell_${params.x}_${params.z}`,
    version: 0,
    objects: []
  };

  const wrapper: TAbstractWrapper<TSpatialCell> = AbstractWrapper(entity, WrapperType.SpatialCell, params as any);
  const update$: Subject<TSpatialCell> = new Subject<TSpatialCell>();

  const sub$: Subscription = wrapper.destroy$.subscribe((): void => {
    sub$.unsubscribe();

    // eslint-disable-next-line functional/immutable-data
    entity.objects.length = 0;

    update$.complete();
  });

  const findObject = (id: string): TActor | undefined => entity.objects.find((o: TActor): boolean => o.id === id);

  function addObject(object: TActor): void {
    // eslint-disable-next-line functional/immutable-data
    entity.objects.push(object);
    // eslint-disable-next-line functional/immutable-data
    entity.version++;
    update$.next(entity);
  }

  const getObjects = (): ReadonlyArray<TActor> => entity.objects;

  const removeObject = (actor: TActor): void => {
    const index: number = getObjects().indexOf(actor);
    if (index === -1) throw new Error(`Cannot remove actor (id: "${actor.id}", name: "${actor.name}") from spatial cell (id: "${entity.id}"). Such actor is not in the cell`);

    // eslint-disable-next-line functional/immutable-data
    entity.objects.splice(index, 1);
    // eslint-disable-next-line functional/immutable-data
    entity.version++;
    update$.next(entity);
  };

  // eslint-disable-next-line functional/immutable-data
  const result = Object.assign(wrapper, {
    name: params.name ?? entity.id,
    // eslint-disable-next-line no-restricted-syntax
    get minX(): number {
      return entity.minX;
    },
    // eslint-disable-next-line no-restricted-syntax
    get minY(): number {
      return entity.minY;
    },
    // eslint-disable-next-line no-restricted-syntax
    get maxX(): number {
      return entity.maxX;
    },
    // eslint-disable-next-line no-restricted-syntax
    get maxY(): number {
      return entity.maxY;
    },
    getVersion: (): number => entity.version,
    findObject,
    addObject,
    getObjects,
    removeObject,
    update$: update$.asObservable(),
    serialize: (): TSpatialCellSerializedData => entityToConfigSpatialCell(result)
  });

  return result;
}
