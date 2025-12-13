import { AbstractDestroyableFactory, AbstractWrapperFactory } from '@Engine/Domains/Abstract';
import type { IActorFactory } from '@Engine/Domains/Actor';
import { ActorFactory } from '@Engine/Domains/Actor';
import type { ICameraFactory } from '@Engine/Domains/Camera';
import { CameraFactory } from '@Engine/Domains/Camera';
import type { IControlsFactory, IControlsFactoryParams } from '@Engine/Domains/Controls';
import { ControlsFactory } from '@Engine/Domains/Controls';
import { InputFactory } from '@Engine/Domains/Input';
import type { IInputFactory } from '@Engine/Domains/Input/Models';
import type { ILightFactory } from '@Engine/Domains/Light';
import { LightFactory } from '@Engine/Domains/Light';
import type { ILoopFactory } from '@Engine/Domains/Loop';
import { LoopFactory } from '@Engine/Domains/Loop';
import type { IRendererFactory } from '@Engine/Domains/Renderer';
import { RendererFactory } from '@Engine/Domains/Renderer';
import type { ISceneFactory } from '@Engine/Domains/Scene';
import { SceneFactory } from '@Engine/Domains/Scene';
import type { IAbstractWrapperFactory, IDestroyableFactory } from '@Engine/Models';
import { isDestroyedFactory } from '@Engine/Utils/DestroyableUtils';

describe('DestroyableUtils', () => {
  describe('isDestroyedFactory', () => {
    // eslint-disable-next-line
    const controlsFactoryParams: IControlsFactoryParams = { canvas: {} as any, cameraRegistry: {} as any };

    describe('Not destroyed factories', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-return
      const abstractFactory: IAbstractWrapperFactory<any, any, any> = AbstractWrapperFactory('mock', () => ({} as any));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-return
      const abstractDestroyableFactory: IDestroyableFactory<any, any, any, any> = AbstractDestroyableFactory('mock', () => ({} as any));
      const actorFactory: IActorFactory = ActorFactory();
      const cameraFactory: ICameraFactory = CameraFactory();
      const controlsFactory: IControlsFactory = ControlsFactory(controlsFactoryParams);
      const inputFactory: IInputFactory = InputFactory();
      const lightFactory: ILightFactory = LightFactory();
      const loopFactory: ILoopFactory = LoopFactory();
      const rendererFactory: IRendererFactory = RendererFactory();
      const sceneFactory: ISceneFactory = SceneFactory();

      it('should return "false" for normal factories', () => {
        expect(isDestroyedFactory(abstractFactory)).toBe(false);
        expect(isDestroyedFactory(abstractDestroyableFactory)).toBe(false);
        expect(isDestroyedFactory(actorFactory)).toBe(false);
        expect(isDestroyedFactory(cameraFactory)).toBe(false);
        expect(isDestroyedFactory(controlsFactory)).toBe(false);
        expect(isDestroyedFactory(inputFactory)).toBe(false);
        expect(isDestroyedFactory(lightFactory)).toBe(false);
        expect(isDestroyedFactory(loopFactory)).toBe(false);
        expect(isDestroyedFactory(rendererFactory)).toBe(false);
        expect(isDestroyedFactory(sceneFactory)).toBe(false);
      });
    });

    describe('destroyed factories', () => {
      it('should return "true" for destroyed ControlsFactory', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-return
        const abstractDestroyableFactory: IDestroyableFactory<any, any, any, any> = AbstractDestroyableFactory('mock', () => ({} as any));
        abstractDestroyableFactory.destroy();
        expect(isDestroyedFactory(abstractDestroyableFactory)).toBe(true);
      });

      it('should return "true" for destroyed ControlsFactory', () => {
        const destroyedControlsFactory: IControlsFactory = ControlsFactory(controlsFactoryParams);
        destroyedControlsFactory.destroy();
        expect(isDestroyedFactory(destroyedControlsFactory)).toBe(true);
      });
    });
  });
});
