import { BehaviorSubject, combineLatest } from 'rxjs';

import type { IShowcase } from '@/App/Levels/Models';
import type { IActorWrapper, IAppCanvas, ICameraWrapper, ILevel, ILevelConfig, ITextAnyWrapper, IVector3Wrapper } from '@/Engine';
import { ambientContext, buildLevelFromConfig, CameraTag, getRotationByCos, getRotationBySin, isNotDefined, TextType } from '@/Engine';

import levelConfig from './showcase-10-complex-materials.config.json';

const { mousePositionWatcher, screenSizeWatcher, mouseClickWatcher } = ambientContext;

//Showcase 10: Complex Materials
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);
  const { textFactory, actorRegistry, cameraRegistry } = level.entities;
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
    lookAtActor(actor);
  });

  function lookAtActor(actor: IActorWrapper): void {
    if (isNotDefined(actor) || isNotDefined(camera)) throw new Error('Actor or camera is not found');
    camera.lookAt(actor.getPosition());
  }

  function moveTextToActor(actor: IActorWrapper): void {
    const position: IVector3Wrapper = actor.getPosition();
    const x: number = position.getX();
    const y: number = position.getY();
    const z: number = position.getZ();
    textDescription.setPosition(x - 1.5, y + 1, z);
    textDescription.setText(currentMaterial$.value + ' material');
  }

  mouseClickWatcher.value$.subscribe((): void => {
    currentMaterialIndex$.next((currentMaterialIndex$.value + 1) % materials.length);
  });

  combineLatest([mousePositionWatcher.value$, screenSizeWatcher.latest$]).subscribe(([{ x, y }, { width, height }]): void => {
    if (isNotDefined(camera)) return;
    const xRatio: number = x / width - 0.5;
    const yRatio: number = -(y / height - 0.5);

    const xRotation: number = getRotationBySin(xRatio, 1, 2);
    const yRotation: number = getRotationByCos(xRatio, 1, 2);
    // camera.setX(xRatio * 10);
    camera.setX(xRotation);
    camera.setY(yRatio * 10);
    camera.setZ(yRotation);

    camera.lookAt(currentActor$.value.getPosition());
  });

  function start(): void {
    level.start();
  }

  return { start, level };
}
