import type { Material, MeshPhysicalMaterial, MeshStandardMaterial } from 'three';

export type TWithMetalness = Material & Pick<MeshStandardMaterial, 'metalness'>;
export type TWithRoughness = Material & Pick<MeshStandardMaterial, 'roughness'>;
export type TWithAoIntensity = Material & Pick<MeshStandardMaterial, 'aoMapIntensity'>;
export type TWithDisplacementScale = Material & Pick<MeshStandardMaterial, 'displacementScale'>;
export type TWithClearcoat = Material & Pick<MeshPhysicalMaterial, 'clearcoat'>;
export type TWithClearcoatRoughness = Material & Pick<MeshPhysicalMaterial, 'clearcoatRoughness'>;
export type TWithSheen = Material & Pick<MeshPhysicalMaterial, 'sheen'>;
export type TWithSheenRoughness = Material & Pick<MeshPhysicalMaterial, 'sheenRoughness'>;
export type TWithSheenColor = Material & Pick<MeshPhysicalMaterial, 'sheenColor'>;
export type TWithIridescence = Material & Pick<MeshPhysicalMaterial, 'iridescence'>;
export type TWithIridescenceIOR = Material & Pick<MeshPhysicalMaterial, 'iridescenceIOR'>;
export type TWithTransmission = Material & Pick<MeshPhysicalMaterial, 'transmission'>;
export type TWithIOR = Material & Pick<MeshPhysicalMaterial, 'ior'>;
export type TWithThickness = Material & Pick<MeshPhysicalMaterial, 'thickness'>;
