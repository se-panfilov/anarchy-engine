import { Scene } from 'three';
import { Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { WrappedScene } from './Models/WrappedScene';
import type { WrappedCamera } from '@Engine/Camera/Models/WrappedCamera';
import type { WrappedActor } from '@Engine/Actor/Models/WrappedActor';

export function SceneWrapper(): WrappedScene {
  let scene = new Scene();
  const destroyed$ = new Subject<void>();

  function addCamera({ camera }: WrappedCamera): void {
    scene.add(camera);
  }

  function addActor({ actor }: WrappedActor): void {
    scene.add(actor);
  }

  function destroy() {
    scene = undefined as any;
    destroyed$.next();
    destroyed$.complete();
  }

  return { id: `scene_wrapper_${nanoid()}`, addCamera, addActor, scene, destroy, destroyed$ };
}
