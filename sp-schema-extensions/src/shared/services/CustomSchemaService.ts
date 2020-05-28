import {ICustomSchemaService} from "../interfaces";
import {SchemaExtension} from "@microsoft/microsoft-graph-types";
import { MSGraphClient } from '@microsoft/sp-http';

interface IGraphSchemaResponse {
  value: SchemaExtension[];
  "@odata.nextLink": string | undefined;
}

export class CustomSchemaService implements ICustomSchemaService {

  private _top: number;
  private _next: string;

  constructor(private graphClient: MSGraphClient, private ownerId: string) {

  }

  public top(value: number): ICustomSchemaService {
    this._top = value;
    return this;
  }

  public async next(): Promise<SchemaExtension[]> {
    const response = await this.graphClient.api(this._next).get() as IGraphSchemaResponse;
    this._next = response['@odata.nextLink'];
    return response.value;
  }

  public get nextPageExists(): boolean {
    return !!this._next;
  }

  public async get(): Promise<SchemaExtension[]> {
    const request = await this.graphClient.api('/schemaExtensions');

    if (this._top){
      request.top(this._top);
    }

    const response = await request.get() as IGraphSchemaResponse;

    this._next = response['@odata.nextLink'];
    return response.value;
  }
}
