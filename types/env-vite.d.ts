/// <reference types="vite/client" />

interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  // strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  VITE_SHOW_DEBUG_INFO: boolean;
  VITE_AUDIO_LOOP_STEP: number;
  VITE_AUDIO_LOOP_IS_PARALLEL: boolean;
  VITE_PHYSICAL_LOOP_STEP: number;
  VITE_PHYSICAL_LOOP_IS_PARALLEL: boolean;
  VITE_COLLISIONS_LOOP_STEP: number;
  VITE_COLLISIONS_LOOP_IS_PARALLEL: boolean;
  VITE_KINEMATIC_LOOP_STEP: number;
  VITE_KINEMATIC_LOOP_IS_PARALLEL: boolean;
  VITE_SPATIAL_LOOP_STEP: number;
  VITE_SPATIAL_LOOP_IS_PARALLEL: boolean;
  VITE_TRANSFORM_LOOP_STEP: number;
  VITE_TRANSFORM_LOOP_IS_PARALLEL: boolean;
  VITE_TEXT_LOOP_STEP: number;
  VITE_TEXT_LOOP_IS_PARALLEL: boolean;
  VITE_KEYBOARD_LOOP_STEP: number;
  VITE_KEYBOARD_LOOP_IS_PARALLEL: boolean;
  VITE_MOUSE_LOOP_STEP: number;
  VITE_MOUSE_LOOP_IS_PARALLEL: boolean;
  VITE_INTERSECTIONS_LOOP_STEP: number;
  VITE_INTERSECTIONS_LOOP_IS_PARALLEL: boolean;
  VITE_CONTROLS_LOOP_STEP: number;
  VITE_CONTROLS_LOOP_IS_PARALLEL: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
