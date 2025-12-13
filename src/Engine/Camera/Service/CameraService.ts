import type { ICameraRegistry, ICameraService, ICameraWrapper } from '@/Engine/Camera/Models';

export function CameraService(): ICameraService {
  function setActiveCamera(cameraId: string, cameraRegistry: ICameraRegistry): void {
    cameraRegistry.forEach((camera: ICameraWrapper) => camera.setActive(camera.id === cameraId));
  }

  function getActiveCamera(cameraRegistry: ICameraRegistry): ICameraWrapper | undefined {
    return cameraRegistry.find((camera: ICameraWrapper) => camera.isActive());
  }

  return {
    setActiveCamera,
    getActiveCamera
  };
}

export const cameraService: ICameraService = CameraService();
