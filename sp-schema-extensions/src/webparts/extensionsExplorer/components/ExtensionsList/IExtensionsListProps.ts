import {SchemaExtension} from "@microsoft/microsoft-graph-types";
import * as React from "react";

export interface IExtensionsListProps {
  items: SchemaExtension[];
  onItemSelected: React.Dispatch<React.SetStateAction<SchemaExtension>>;
  selectedItem: SchemaExtension;
}
