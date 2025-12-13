import type { IShowcase } from '@/App/Levels/Models';
import type { IActorWrapperAsync, IAnimationParams, IAppCanvas, ILevel, ILevelConfig, IText2dWrapper, ITextAnyWrapper, IWithCoordsXZ } from '@/Engine';
import { buildLevelFromConfig, createCirclePathXZ, Easing, EulerWrapper, generateAnglesForCircle, isNotDefined, mouseService, standardMoverService, TextType, Vector3Wrapper } from '@/Engine';

import levelConfig from './showcase-5-animejs-complex.config.json';

//Showcase 5: Anime.js animation with complex path and easing
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);

  async function init(): Promise<void> {
    const { actorRegistry, cameraRegistry, controlsRegistry, text2dRegistry, textFactory } = level.entities;

    controlsRegistry.getAll()[0]?.entity.target.set(6, 0, 0);
    cameraRegistry.getAll()[0]?.setPosition(Vector3Wrapper({ x: 6, y: 30, z: 0 }));

    const redActor: IActorWrapperAsync | undefined = await actorRegistry.getUniqByTagAsync('red');
    const blueActor: IActorWrapperAsync | undefined = await actorRegistry.getUniqByTagAsync('blue');
    const greenActor: IActorWrapperAsync | undefined = await actorRegistry.getUniqByTagAsync('green');
    if (isNotDefined(redActor) || isNotDefined(blueActor) || isNotDefined(greenActor)) throw new Error('Actors are not defined');

    const redText: IText2dWrapper | undefined = text2dRegistry.getUniqByTag('red');
    const blueText: IText2dWrapper | undefined = text2dRegistry.getUniqByTag('blue');
    const greenText: IText2dWrapper | undefined = text2dRegistry.getUniqByTag('green');
    if (isNotDefined(redText) || isNotDefined(blueText) || isNotDefined(greenText)) throw new Error('Texts are not defined');

    let isClickBlocked: boolean = false;

    const animationParams: IAnimationParams = {
      duration: 2000,
      direction: 'normal'
    };

    const numberOfPoints: number = 160;
    const numberOfCircles: number = 1;
    const startAngle: number = 100;
    const radius: number = 15;
    const angleArray: ReadonlyArray<number> = generateAnglesForCircle(numberOfPoints, numberOfCircles, startAngle);

    const redPath: ReadonlyArray<IWithCoordsXZ> = createCirclePathXZ(angleArray, radius, { x: 0, z: 0 });
    const greenPath: ReadonlyArray<IWithCoordsXZ> = createCirclePathXZ(angleArray, radius - 2, { x: 0, z: 0 });
    const bluePath: ReadonlyArray<IWithCoordsXZ> = createCirclePathXZ(angleArray, radius - 4, { x: 0, z: 0 });

    let followersCb: Record<string, (() => void) | undefined> = {
      red: undefined,
      green: undefined,
      blue: undefined
    };

    function follow(): void {
      if (isNotDefined(redText) || isNotDefined(blueText) || isNotDefined(greenText)) throw new Error('Texts are not defined');
      if (isNotDefined(redActor) || isNotDefined(blueActor) || isNotDefined(greenActor)) throw new Error('Actors are not defined');
      followersCb = { ...followersCb, red: standardMoverService.followTarget(redText, redActor, { x: 1 }) };
      followersCb = { ...followersCb, blue: standardMoverService.followTarget(blueText, blueActor, { x: 1 }) };
      followersCb = { ...followersCb, green: standardMoverService.followTarget(greenText, greenActor, { x: 1 }) };
    }

    function stopFollowing(): void {
      followersCb.red?.();
      followersCb.green?.();
      followersCb.blue?.();
    }

    const notification: ITextAnyWrapper = textFactory.create({
      type: TextType.Text2d,
      text: 'Click is blocked',
      cssProps: {
        fontSize: '12px'
      },
      position: Vector3Wrapper({ x: 0, y: 0, z: 1 }),
      rotation: EulerWrapper({ x: -1.57, y: 0, z: 0 }),
      visible: false,
      tags: []
    });

    mouseService.clickLeftRelease$.subscribe(() => {
      if (isClickBlocked) {
        redActor.setVisible(false);
        notification.setVisible(true);
        setTimeout(() => notification.setVisible(false), 1000);
        return;
      }
      isClickBlocked = true;
      follow();

      void Promise.all([
        standardMoverService.goByPath(redActor, redPath, { ...animationParams, easing: Easing.Linear }).then(() => console.log('red done')),
        standardMoverService.goByPath(greenActor, greenPath, { ...animationParams, easing: Easing.EaseInCirc }).then(() => console.log('green done')),
        standardMoverService.goByPath(blueActor, bluePath, { ...animationParams, easing: Easing.EaseInBack }).then(() => console.log('blue done'))
      ]).then(() => {
        isClickBlocked = false;
        stopFollowing();
      });
    });
  }

  function start(): void {
    level.start();
    void init();
  }

  return { start, level };
}
