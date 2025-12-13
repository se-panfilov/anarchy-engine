export type IMoverServiceConfig = Readonly<{
  //If "true" - do not pause animation when document is hidden (i.g. when user switches to another tab)
  suspendWhenDocumentHidden: boolean;
}>;
