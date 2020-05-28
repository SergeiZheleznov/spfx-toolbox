import {SchemaExtension} from '@microsoft/microsoft-graph-types';

export interface ICustomSchemaService {
  top(value: number): ICustomSchemaService;
  get(): Promise<SchemaExtension[]>;
  next(): Promise<SchemaExtension[]>;
  nextPageExists: boolean;
}
