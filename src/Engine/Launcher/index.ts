import { CameraTag } from '@Engine/Constants';
import { addToRegistry } from '@Engine/Launcher/AddToRegistry';
import type { ISceneConfig } from '@Engine/Launcher/Models';
import type { IAppCanvas } from '@Engine/Models';
import { initRegistriesAddSubscription } from '@Engine/Pool/GetRegistiryPool';
import type { IFactoriesPool, IRegistriesPool } from '@Engine/Pool/Models';
import { createDeferredPromise } from '@Engine/Utils';
import type { ICameraWrapper, ILoopWrapper, IRendererWrapper, ISceneWrapper } from '@Engine/Wrappers';

export async function launchScene(
  sceneConfig: ISceneConfig,
  canvas: IAppCanvas,
  factoriesPool: IFactoriesPool,
  registryPool: IRegistriesPool
): Promise<boolean> {
  const { name, actors, cameras, lights, controls } = sceneConfig;
  const { actorFactory, cameraFactory, lightFactory, controlsFactory, rendererFactory, sceneFactory, loopFactory } =
    factoriesPool;
  const { actorRegistry, cameraRegistry, lightRegistry, controlsRegistry } = registryPool;
  const { promise, resolve } = createDeferredPromise<boolean>();

  const scene: ISceneWrapper = sceneFactory.create({ name });

  initRegistriesAddSubscription(scene, registryPool);

  addToRegistry(actors, actorFactory, actorRegistry);
  addToRegistry(cameras, cameraFactory, cameraRegistry);
  addToRegistry(lights, lightFactory, lightRegistry);
  addToRegistry(controls, controlsFactory, controlsRegistry);

  const renderer: IRendererWrapper = rendererFactory.create({ canvas });

  // create intersection pointer (mouse pointer, camera, scene)/////////////////////
  // TODO (S.Panfilov)
  // function IntersectionPointerWrapper(
  //   mousePointer: Pick<WrappedMousePointer, 'position$' | 'click$' | 'destroyed$'>,
  //   camera: WrappedCamera,
  //   obj: ReadonlyArray<Object3D>
  // ): WrappedIntersectionPointer {
  //   const position$ = new BehaviorSubject<Vector3>(new Vector3());
  //   const click$ = new Subject<{ readonly position: Vector3; readonly event: MouseEvent }>();
  //   const destroyed$ = new Subject<void>();
  //
  //   const raycaster = new Raycaster();
  //
  //
  //
  //   mousePointer.position$.subscribe((position: MousePosition) => {
  //     raycaster.setFromCamera(getNormalizedMousePosition(position), camera.camera);
  //     const intersectObj = raycaster.intersectObjects([...obj])[0];
  //     if (intersectObj) position$.next(intersectObj.point);
  //   });
  //
  //   mousePointer.click$.subscribe(({ event }) => click$.next({ position: position$.value, event }));
  //   mousePointer.destroyed$.subscribe(() => destroy());
  //
  //   function destroy() {
  //     mousePointer.position$.unsubscribe();
  //     position$.complete();
  //     destroyed$.next();
  //     destroyed$.complete();
  //   }
  //
  //   return { id: `intersection_pointer_${nanoid()}`, click$, position$, raycaster, destroy, destroyed$ };
  // }
  ////////////////////////////////////

  // listen clicks by intersection pointer/////////////////////
  // TODO (S.Panfilov)
  ////////////////////////////////////

  // TODO (S.Panfilov) any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loop: ILoopWrapper = loopFactory.create({ tag: name });
  const initialCamera: ICameraWrapper = cameraRegistry.getByTag(CameraTag.Initial);
  loop.start(renderer, scene, initialCamera);
  ////////////////////////////////////

  resolve(true);

  return promise;
}
