export type TTemplateParsedEntry = Readonly<{
  id: string; // name@version
  name: string;
  version: string;
  licenses: ReadonlyArray<string>;
  repository?: string;
  url?: string;
  publisher?: string;
  path?: string;
  licenseText?: string; // raw license text if present
  inferredCopyright?: string; // extracted from licenseText or publisher
  upstreamNotice?: string; // filled only if --include-upstream-notices
}>;
