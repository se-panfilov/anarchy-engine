import type { ICameraRegistry, ICameraWrapper } from '@/Engine/Camera';
import { cameraService, CameraTag } from '@/Engine/Camera';

export function setInitialActiveCamera(cameraRegistry: ICameraRegistry): void {
  const len: number = cameraRegistry.getLength();
  if (len === 1) cameraService.setActiveCamera(cameraRegistry.getAll()[0].id, cameraRegistry);
  if (len > 1) {
    const initialCamera: ICameraWrapper | undefined = cameraRegistry.findByTag(CameraTag.Initial);
    if (initialCamera) {
      cameraService.setActiveCamera(initialCamera.id, cameraRegistry);
    }
  }
}
