//Forbids spread operator on the object (e.g. {...obj}, to prevent accidental copy of the object). Use codemod to validate this.
export type TNoSpread = Readonly<{
  __noSpreadBrand?: never;
}>;
