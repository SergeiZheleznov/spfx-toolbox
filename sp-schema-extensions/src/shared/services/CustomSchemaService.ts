import {ICustomSchemaService} from "../interfaces";
import {SchemaExtension} from "@microsoft/microsoft-graph-types";
import { MSGraphClient } from '@microsoft/sp-http';

export class CustomSchemaService implements ICustomSchemaService {

  constructor(private graphClient: MSGraphClient) {

  }

  public async getAll(): Promise<SchemaExtension[]> {
    const response = await this.graphClient.api('/schemaExtensions').get() as {
      value: SchemaExtension[]
    };
    return response.value;
  }
}
