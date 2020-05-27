import * as React from 'react';
import styles from './ExtensionsExplorer.module.scss';
import { IExtensionsExplorerProps } from './IExtensionsExplorerProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {SchemaExtension} from '@microsoft/microsoft-graph-types';
import {useEffect, useState} from "react";
import {CustomSchemaService} from "../../../shared/services";

export const ExtensionsExplorer: React.FunctionComponent<IExtensionsExplorerProps> = (props) => {

  const [extensionsAvailable, setExtensionsAvailable] = useState<SchemaExtension[]>(new Array<SchemaExtension>());

  useEffect(() => {

    (async () => {
      const customSchemaService = new CustomSchemaService(props.graphClient);
      const schemas = await customSchemaService.getAll();
      setExtensionsAvailable(schemas);
    })();
  },[]);

  return(
    <div className={styles.extensionsExplorer}>
      {extensionsAvailable && extensionsAvailable.length ? extensionsAvailable.map((ext) => (
        <div>
          {ext.id} - {ext.description}: {ext.owner}
        </div>
      )) : 'loading'}
    </div>
  );
};
