import * as React from 'react';
import styles from './ExtensionsExplorer.module.scss';
import { IExtensionsExplorerProps } from './IExtensionsExplorerProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {SchemaExtension} from '@microsoft/microsoft-graph-types';
import {useEffect, useState} from "react";

export const ExtensionsExplorer: React.FunctionComponent<IExtensionsExplorerProps> = (props) => {

  const [extensionsAvailable, setExtensionsAvailable] = useState<SchemaExtension[]>(new Array<SchemaExtension>());

  useEffect(() => {
    const {graphClient} = props;
    (async () => {
      const response = await graphClient.api('/schemaExtensions').get() as {
        value: SchemaExtension[]
      };
      setExtensionsAvailable(response.value);
    })();
  },[]);

  return(
    <div className={styles.extensionsExplorer}>
      {extensionsAvailable && extensionsAvailable.length ? extensionsAvailable.map((ext) => (
        <div>
          {ext.id} - {ext.description}
        </div>
      )) : 'loading'}
    </div>
  );
};
