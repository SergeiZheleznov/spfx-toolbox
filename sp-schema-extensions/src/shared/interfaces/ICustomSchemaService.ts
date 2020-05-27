import {SchemaExtension} from '@microsoft/microsoft-graph-types';

export interface ICustomSchemaService {
  getAll(): Promise<SchemaExtension[]>;
}
