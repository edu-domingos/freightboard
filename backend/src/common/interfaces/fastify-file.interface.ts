export interface FastifyFile {
  fieldname: string;
  filename: string;
  encoding: string;
  mimetype: string;
  data: Buffer;
  toBuffer(): Buffer;
}
