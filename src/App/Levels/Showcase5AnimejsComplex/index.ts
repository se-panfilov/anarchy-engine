import type { IShowcase } from '@/App/Levels/Models';
import type { IActorWrapper, IAnimationParams, IAppCanvas, ILevel, ILevelConfig, ITextWrapper, IWithCoordsXZ } from '@/Engine';
import { ambientContext, buildLevelFromConfig, createCirclePathXZ, Easing, EulerWrapper, generateAnglesForCircle, isNotDefined, standardMoverService, TextType, Vector3Wrapper } from '@/Engine';

import levelConfig from './showcase-5-animejs-complex.config.json';

//Showcase 5: Anime.js animation with complex path and easing
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);

  function start(): void {
    level.start();
    const { actorRegistry, cameraRegistry, controlsRegistry, textRegistry, textFactory } = level.entities;

    controlsRegistry.getAll()[0]?.entity.target.set(6, 0, 0);
    cameraRegistry.getAll()[0]?.setPosition(6, 30, 0);

    const redActor: IActorWrapper | undefined = actorRegistry.getUniqByTag('red');
    const blueActor: IActorWrapper | undefined = actorRegistry.getUniqByTag('blue');
    const greenActor: IActorWrapper | undefined = actorRegistry.getUniqByTag('green');
    if (isNotDefined(redActor) || isNotDefined(blueActor) || isNotDefined(greenActor)) throw new Error('Actors are not defined');

    const redText: ITextWrapper | undefined = textRegistry.getUniqByTag('red');
    const blueText: ITextWrapper | undefined = textRegistry.getUniqByTag('blue');
    const greenText: ITextWrapper | undefined = textRegistry.getUniqByTag('green');
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

    const notification: ITextWrapper = textFactory.create({
      type: TextType.Text2d,
      text: 'Click is blocked',
      fontSize: '12px',
      position: Vector3Wrapper({ x: 0, y: 0, z: 1 }),
      rotation: EulerWrapper({ x: -1.57, y: 0, z: 0 }),
      visible: false,
      tags: []
    });

    ambientContext.mouseClickWatcher.value$.subscribe(() => {
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

  return { start, level };
}
