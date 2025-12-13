export type TLicenseEntry = Readonly<{
  id: string;
  name: string;
  version: string;
  licenses: string | ReadonlyArray<string>;
  licenseText?: string;
  repository?: string;
  publisher?: string;
  email?: string;
  url?: string;
  path?: string;
}>;
