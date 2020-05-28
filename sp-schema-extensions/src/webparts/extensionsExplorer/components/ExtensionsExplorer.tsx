import * as React from 'react';
import styles from './ExtensionsExplorer.module.scss';
import { IExtensionsExplorerProps } from './IExtensionsExplorerProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {SchemaExtension} from '@microsoft/microsoft-graph-types';
import {useEffect, useState} from "react";
import {PrimaryButton} from '@fluentui/react';

export const ExtensionsExplorer: React.FunctionComponent<IExtensionsExplorerProps> = (props) => {

  const [extensionsAvailable, setExtensionsAvailable] = useState<SchemaExtension[]>(new Array<SchemaExtension>());
  const {customSchemaService} = props;

  useEffect(() => {

    (async () => {

      const schemas = await customSchemaService.top(5).get();
      setExtensionsAvailable(schemas);
    })();
  },[]);

  const nextButtonClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!props.customSchemaService.nextPageExists) {
      return;
    }

    (async ()=> {
      const schemas = await customSchemaService.next();
      setExtensionsAvailable(schemas);
    })();
  };

  return(
    <div className={styles.extensionsExplorer}>
      {extensionsAvailable && extensionsAvailable.length ? extensionsAvailable.map((ext) => (
        <div>
          {ext.id} - {ext.description}: {ext.owner}
        </div>
      )) : 'loading'}
      <PrimaryButton onClick={nextButtonClickHandler}>Next</PrimaryButton>
    </div>
  );
};
