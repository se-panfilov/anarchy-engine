import { Subject } from 'rxjs';
import type { Mesh } from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { Model3dType } from '@/Engine/Models3d/Constants';
import type { TModel3dParams, TModels3dAsyncRegistry, TModels3dService } from '@/Engine/Models3d/Models';

export function Models3dService(registry: TModels3dAsyncRegistry): TModels3dService {
  const models3dLoader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  models3dLoader.setDRACOLoader(dracoLoader);
  const added$: Subject<Mesh> = new Subject<Mesh>();

  added$.subscribe((mesh: Mesh): void => registry.add(mesh.uuid, mesh));

  // function loadFromConfigAsync(models3ds: ReadonlyArray<string>): ReadonlyArray<Promise<Mesh>> {
  //   return models3ds.map((url: string): Promise<Mesh> => loadAsync(url));
  // }

  // function loadAsync({ url }: TModel3dParams, isForce: boolean = false): Promise<void> {
  function loadAsync({ url }: TModel3dParams): Promise<void> {
    if ([...Object.values(Model3dType)].includes(url as Model3dType)) throw new Error(`Trying to load a primitive(e.g. cube, sphere, etc.) as an imported model: ${url}`);

    // TODO debug
    // if (!isForce) {
    //   const texture: Mesh | undefined = registry.findByKey(url);
    //   if (isDefined(texture)) return Promise.resolve(texture);
    // }

    return models3dLoader.loadAsync(url).then((gltf: GLTF): Mesh => {
      // TODO debug
      // added$.next(mesh);

      // TODO debug
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
      (window as any).scene.add(gltf.scene);

      // TODO debug
      return gltf.scene as any;
    });
  }

  return {
    loadAsync,
    // TODO debug
    // loadFromConfigAsync,
    added$: added$.asObservable()
  };
}
