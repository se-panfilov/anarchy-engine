import { isNotDefined } from '@Engine';

import type { TAppSettings } from '@/Models';

export const routerConfig: Record<string, string> = {
  '/': 'Showcase1MovingActors',
  '/moving-actors': 'Showcase1MovingActors',
  '/top-down': 'Showcase2TopDown',
  '/camera-flying': 'Showcase3CameraFlying',
  '/fullscreen': 'Showcase4Fullscreen',
  '/text2d': 'Showcase5Text2d',
  '/text3d': 'Showcase6Text3d',
  '/textures-and-materials': 'Showcase7TexturesAndMaterials',
  '/complex-materials': 'Showcase8ComplexMaterials',
  '/keyboard-and-mouse': 'Showcase9KeyboardAndMouse',
  '/light': 'Showcase10Light',
  '/fog': 'Showcase11Fog',
  '/switching-active-camera': 'Showcase12SwitchingActiveCamera',
  '/configurable-intersections': 'Showcase13ConfigurableIntersections',
  '/distance': 'Showcase14Distance',
  '/particles': 'Showcase15Particles',
  '/complex-particles': 'Showcase16ComplexParticles',
  '/physics': 'Showcase17Physics',
  '/physics-sync-with-models-test': 'Showcase18PhysicsSyncWithModelsTest',
  '/physics-manual-step': 'Showcase19PhysicsManualStep',
  '/physics-shooter': 'Showcase20PhysicsShooter',
  '/custom-models': 'Showcase21CustomModels',
  '/actors-with-models': 'Showcase22ActorsWithModels',
  '/transform-drive': 'Showcase23TransformDrive',
  '/audio': 'Showcase24Audio',
  '/splitscreen': 'Showcase25SplitScreen',
  '/multiple-scenes': 'Showcase26MultipleScenes',
  '/saves-load': 'Showcases27SaveLoad'
};

export async function route(settings: TAppSettings): Promise<void> {
  // eslint-disable-next-line spellcheck/spell-checker
  const path: string = window.location.pathname;
  const match = path.toLowerCase().match(/^\/([\w-]+)/);
  if (isNotDefined(match) || match.length < 1) return;
  const levelName: string = match[0];

  let result;
  try {
    result = await import(`./Levels/${routerConfig[levelName]}/index.ts`);
    result.start(settings);
  } catch (err: any) {
    console.log(`[Router]: Showcase "${levelName}" not found: ` + err);
  }
}
