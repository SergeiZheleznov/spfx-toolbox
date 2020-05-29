import {SchemaExtension} from "@microsoft/microsoft-graph-types";
import * as React from "react";

export interface IExtensionsListProps {
  items: SchemaExtension[];
  setSelectedItem: React.Dispatch<React.SetStateAction<SchemaExtension>>;
}
