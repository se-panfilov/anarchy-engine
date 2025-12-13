- 1.0.x Initial
- 2.0.x Spaces
- 2.5.x Particles
- 2.6.x Environment maps
- 2.7.x Physics
- 3.0.x WASM
- 3.5.x Kinematic movement
- 4.x.x Spatial grid detection
- 5.x.x Raycasting & Collision detection
- 5.2.1 Production build fix (WASM)
- 6.0.x Complex models
- 7.x.x Animations
- 8.x.x Actors with models & animations
- 9.x.x Split resources and entities load from config (among others: extracted materials, models, etc from actors)
- 9.1.x Refactor Vector/TVectorWrapper, Euler/TEulerWrapper (should be Vector/Euler everywhere)
- 9.2.x Transform drive
- 10.0.x Refactor loops (physics, collision and etc) loops should be based on milliseconds, not frames. Only rendering loop should be based on frames
- 11.0.x Sounds/Music
- 12.0.x Fix Registries (should always return the same object)
- 12.1.x Fixed production build (removed topLevelAsync vite plugin)
- 13.0.x Deletion and resource dispose (memory management)
- 13.1.x Refactored spaces and services (better destroy and re-create)
- 14.0.0 Multiple scenes full support (unload/load scenes one after another and hard reset)
- 14.0.2 Own canvas for each Space
- 14.0.3 Configurable renderer
- 14.0.5 Mouse position detection adjusted to the canvas size when
- 14.0.7 Replaced ScreenService with ContainerDecorator
- 15.0.0 Save/Load configs (serialization)
- 16.0.0 Dotenv config
- 17.0.0 E2E tests
- 17.0.1 clean up metadata in assets
- 17.2.0 Get rid of animejs in the engine
- 17.4.0 Better physics serialization/deserialization
- 17.5.0 Intersections watchers split to camera-mouse based and origin-direction based
- 17.5.1 Replaced Object.assign with mergeAll (a fix for a broken TS types merging)
- 18.0.0 Monorepo: Split apps and engine
- 19.0.0 Reduce package size (prod build)
- 20.0.0 Configurable Space (added options)
- 20.1.0 Inline css for Text3d/Text2d
- 20.2.0 Configurable DracoLoader path (for Desktop app)
- 20.3.0 Extracted some code to shared package (utils, types, etc.)
- 21.0.0 Texts now support translations (i18n)
- 21.1.0 Security: better CSP (no need in unsafe-eval), due to fixing AJV usage

Roadmap:

- 22.0.x Create a npm package
- 23.x.x Load managers domain for resource loaders (audio, animations, envMaps, materials, models3d, textures, etc.)
- 24.x.x Postprocessing
- 25.0.x Shaders
- 26.0.x Modules: distinct engine/rapier from engine/core. Bonus: Make possible to load engine/rapier in async way

Thoughts:

- Maybe: Add a possibility to run E2E tests against minified code (prod). Cause minification could break things;
- Maybe: Replace all no-duplicates arrays with Maps (for performance)?;
- Maybe: Try to replace spread operator with Object.assign everywhere (for performance and make sure that we are not creating new objects)? Check with AbstractEntity first;
- Maybe: Add domain for timers (based on web workers);
- Maybe: Add domain for lines;
- Maybe: Refactor withActive entities (use active$) (camera, renderer, etc);
- Maybe: A single generic factory and registries for all entities (actor, model, etc.), instead of files create them with params;
- Maybe: Is it makes any sense to replace Rapier with Havok?;
- BUG: #191823 Text3dTextures doesn't update text values on textures on change;
- TASK: Check every function in the engine that it's not calling every second (with adding console.log everywhere);
- TASK: Check performance (make sure materials and env maps are async)
- TASK: Take a look on entities in runtime (console.log) to see what fields are there, what are values, etc.;
- TASK: Clean up dependencies (some should be used by the app, not the engine);
- TASK: Align types name: intersection types should start with TAny..., e.g. TAnyMaterial = TMaterial1 | TMaterial2;

Won't be implemented soon:

- Maybe: Split data entities from functional entities – ECS approach (too hard to migrate now);
