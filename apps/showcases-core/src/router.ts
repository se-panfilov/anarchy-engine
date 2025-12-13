import type { TAppSettings } from '@/Models';

export const routerConfig: Record<string, string> = {
  movingActors: 'Showcase1MovingActors',
  topDown: 'Showcase2TopDown',
  cameraFlying: 'Showcase3CameraFlying',
  fullscreen: 'Showcase4Fullscreen',
  text2d: 'Showcase5Text2d',
  text3d: 'Showcase6Text3d',
  texturesAndMaterials: 'Showcase7TexturesAndMaterials',
  complexMaterials: 'Showcase8ComplexMaterials',
  keyboardAndMouse: 'Showcase9KeyboardAndMouse',
  light: 'Showcase10Light',
  fog: 'Showcase11Fog',
  switchingActiveCamera: 'Showcase12SwitchingActiveCamera',
  configurableIntersections: 'Showcase13ConfigurableIntersections',
  distance: 'Showcase14Distance',
  particles: 'Showcase15Particles',
  complexParticles: 'Showcase16ComplexParticles',
  physics: 'Showcase17Physics',
  physicsSyncWithModelsTest: 'Showcase18PhysicsSyncWithModelsTest',
  physicsManualStep: 'Showcase19PhysicsManualStep',
  physicsShooter: 'Showcase20PhysicsShooter',
  customModels: 'Showcase21CustomModels',
  actorsWithModels: 'Showcase22ActorsWithModels',
  transformDrive: 'Showcase23TransformDrive',
  audio: 'Showcase24Audio',
  splitscreen: 'Showcase25SplitScreen',
  multipleScenes: 'Showcase26MultipleScenes',
  saveLoad: 'Showcase27SaveLoad',
  menu: 'Showcase28Menu'
};

export async function route(settings: TAppSettings): Promise<void> {
  const params = new URLSearchParams(window.location.search);
  const path: string = params.get('path') ?? Object.keys(routerConfig)[0];

  let result;
  try {
    result = await import(`./Levels/${routerConfig[path]}/index.ts`);
    console.log(`[Router]: Loading './Levels/${routerConfig[path]}/index.ts'`);
    result.start(settings);
  } catch (err: any) {
    throw new Error(`[Router]: Showcase "${path}" not found: ` + err);
  }
}
