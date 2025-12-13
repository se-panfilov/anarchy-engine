import type { IActorFactory, ICameraFactory, IControlsFactory, IControlsFactoryParams, IInputFactory, ILightFactory, ILoopFactory, IRendererFactory, ISceneFactory } from '@Engine/Factories';
import { AbstractFactory, ActorFactory, CameraFactory, ControlsFactory, InputFactory, LightFactory, LoopFactory, RendererFactory, SceneFactory } from '@Engine/Factories';
import { AbstractDestroyableFactory } from '@Engine/Factories/AbstractFactory/AbstractDestroyableFactory';
import type { IDestroyableFactory, IAbstractFactory } from '@Engine/Models';
import { isDestroyedFactory } from '@Engine/Utils/DestroyableUtils';

describe('DestroyableUtils', () => {
  describe('isDestroyedFactory', () => {
    // eslint-disable-next-line
    const controlsFactoryParams: IControlsFactoryParams = { canvas: {} as any, cameraRegistry: {} as any };

    describe('Not destroyed factories', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-return
      const abstractFactory: IAbstractFactory<any, any, any, any> = AbstractFactory('mock', () => ({} as any));
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
