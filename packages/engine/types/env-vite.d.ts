/// <reference types="vite/client" />

interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  // strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  VITE_AUDIO_LOOP_STEP: string;
  VITE_AUDIO_LOOP_IS_PARALLEL: string;
  VITE_PHYSICS_LOOP_STEP: string;
  VITE_PHYSICS_LOOP_IS_PARALLEL: string;
  VITE_COLLISIONS_LOOP_STEP: string;
  VITE_COLLISIONS_LOOP_IS_PARALLEL: string;
  VITE_KINEMATIC_LOOP_STEP: string;
  VITE_KINEMATIC_LOOP_IS_PARALLEL: string;
  VITE_SPATIAL_LOOP_STEP: string;
  VITE_SPATIAL_LOOP_IS_PARALLEL: string;
  VITE_TRANSFORM_LOOP_STEP: string;
  VITE_TRANSFORM_LOOP_IS_PARALLEL: string;
  VITE_TEXT_LOOP_STEP: string;
  VITE_TEXT_LOOP_IS_PARALLEL: string;
  VITE_KEYBOARD_LOOP_STEP: string;
  VITE_KEYBOARD_LOOP_IS_PARALLEL: string;
  VITE_MOUSE_LOOP_STEP: string;
  VITE_MOUSE_LOOP_IS_PARALLEL: string;
  VITE_INTERSECTIONS_LOOP_STEP: string;
  VITE_INTERSECTIONS_LOOP_IS_PARALLEL: string;
  VITE_CONTROLS_LOOP_STEP: string;
  VITE_CONTROLS_LOOP_IS_PARALLEL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
