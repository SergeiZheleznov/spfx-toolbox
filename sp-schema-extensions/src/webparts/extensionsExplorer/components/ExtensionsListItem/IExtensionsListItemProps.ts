import {SchemaExtension} from "@microsoft/microsoft-graph-types";
import * as React from "react";
export interface IExtensionsListItemProps {
  schemaExtension: SchemaExtension;
  onItemSelect(event: React.MouseEvent<HTMLButtonElement>): void;
  active: boolean;
}
