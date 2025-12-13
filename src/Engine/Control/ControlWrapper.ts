import { Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { WrappedControl } from '@Engine/Control/Models/WrappedControl';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import type { WrappedRenderer } from '@Engine/Renderer/Models/WrappedRenderer';
import type { WrappedCamera } from '@Engine/Camera/Models/WrappedCamera';

export function ControlWrapper(wrappedCamera: WrappedCamera, wrappedRenderer: WrappedRenderer): WrappedControl {
  let control = new OrbitControls(wrappedCamera.camera, wrappedRenderer.renderer.domElement);
  control.enableDamping = true;

  const destroyed$ = new Subject<void>();

  function destroy() {
    control = undefined as any;
    destroyed$.next();
    destroyed$.complete();
  }

  return { id: `control_wrapper_${nanoid()}`, control, destroy, destroyed$ };
}
