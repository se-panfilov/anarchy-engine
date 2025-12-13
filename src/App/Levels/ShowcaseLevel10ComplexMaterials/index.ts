import { BehaviorSubject } from 'rxjs';

import type { IShowcase } from '@/App/Levels/Models';
import { IActorWrapper, IAppCanvas, ICameraWrapper, ILevel, ILevelConfig, IOrbitControlsWrapper, ITextAnyWrapper, IVector3Wrapper, Vector3Wrapper } from '@/Engine';
import { ambientContext, buildLevelFromConfig, CameraTag, isNotDefined, TextType } from '@/Engine';

import levelConfig from './showcase-10-complex-materials.config.json';

const { mouseClickWatcher } = ambientContext;

//Showcase 10: Complex Materials
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);
  const { textFactory, actorRegistry, cameraRegistry, controlsRegistry } = level.entities;
  const camera: ICameraWrapper | undefined = cameraRegistry.getUniqByTag(CameraTag.Active);
  if (isNotDefined(camera)) throw new Error('Camera is not found');

  const textDescription: ITextAnyWrapper = textFactory.create({
    type: TextType.Text2d,
    text: '',
    cssProps: { fontSize: '2rem', color: 'red' },
    tags: []
  });

  const materials: ReadonlyArray<string> = ['standard', 'basic', 'phong', 'lambert', 'toon', 'physical', 'matcap'];
  const currentMaterialIndex$: BehaviorSubject<number> = new BehaviorSubject(0);
  const currentMaterial$: BehaviorSubject<string> = new BehaviorSubject(materials[currentMaterialIndex$.value]);
  const initialActor: IActorWrapper | undefined = actorRegistry.getUniqByTag(currentMaterial$.value);
  if (isNotDefined(initialActor)) throw new Error(`Actor with tag "${currentMaterialIndex$.value}" is not found`);
  const currentActor$: BehaviorSubject<IActorWrapper> = new BehaviorSubject(initialActor);
  currentMaterialIndex$.subscribe((index: number): void => currentMaterial$.next(materials[index]));
  currentMaterial$.subscribe((material: string): void => {
    const actor: IActorWrapper | undefined = actorRegistry.getUniqByTag(material);
    if (isNotDefined(actor)) throw new Error(`Actor with tag "${material}" is not found`);
    currentActor$.next(actor);
  });

  currentActor$.subscribe((actor: IActorWrapper): void => {
    moveTextToActor(actor);
    moveCameraToActor(actor);
  });

  function moveTextToActor(actor: IActorWrapper): void {
    const position: IVector3Wrapper = actor.getPosition();
    const x: number = position.getX();
    const y: number = position.getY();
    const z: number = position.getZ();
    textDescription.setPosition(Vector3Wrapper({ x: x - 1.5, y: y + 1, z }));
    textDescription.setText(currentMaterial$.value + ' material');
  }

  mouseClickWatcher.value$.subscribe((): void => {
    currentMaterialIndex$.next((currentMaterialIndex$.value + 1) % materials.length);
  });

  function moveCameraToActor(actor: IActorWrapper): void {
    const position: IVector3Wrapper = actor.getPosition();
    const orbitControls: IOrbitControlsWrapper | undefined = controlsRegistry.getUniqByTag('orbit');
    if (isNotDefined(orbitControls)) throw new Error('Orbit controls are not found');
    orbitControls.setTarget(position);
  }

  function start(): void {
    level.start();
  }

  return { start, level };
}
