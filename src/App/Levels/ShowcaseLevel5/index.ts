import type { IShowcase } from '@/App/Levels/Models';
import type { IActorWrapper, IAnimationParams, IAppCanvas, ILevel, ILevelConfig, ITextWrapper, IWithCoordsXZ } from '@/Engine';
import { ambientContext, buildLevelFromConfig, createCirclePathXZ, Easing, generateAnglesForCircle, isNotDefined, standardMoverService } from '@/Engine';

import levelConfig from './showcase-level-5.config.json';

//Showcase 5: Anime.js animation with complex path and easing
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);

  function start(): void {
    level.start();
    const { actorRegistry, cameraRegistry, controlsRegistry, textRegistry } = level.entities;

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

    standardMoverService.followTarget(redText, redActor, { x: 1 });
    standardMoverService.followTarget(blueText, blueActor, { x: 1 });
    standardMoverService.followTarget(greenText, greenActor, { x: 1 });

    ambientContext.mouseClickWatcher.value$.subscribe(() => {
      if (isClickBlocked) {
        console.log('click is blocked');
        return;
      }
      isClickBlocked = true;

      void Promise.all([
        standardMoverService.goByPath(redActor, redPath, { ...animationParams, easing: Easing.Linear }).then(() => console.log('red done')),
        standardMoverService.goByPath(greenActor, greenPath, { ...animationParams, easing: Easing.EaseInCirc }).then(() => console.log('green done')),
        standardMoverService.goByPath(blueActor, bluePath, { ...animationParams, easing: Easing.EaseInBack }).then(() => console.log('blue done'))
      ]).then(() => (isClickBlocked = false));
    });
  }

  return { start, level };
}
