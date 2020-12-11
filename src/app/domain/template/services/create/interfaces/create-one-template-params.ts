export interface CreateTemplateData {
  readonly fileType: string;
  readonly file: Buffer;
}

export interface CreateOneTemplateParams {
  readonly templateData: CreateTemplateData;
}
