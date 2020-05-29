import * as React from 'react';
import styles from './ExtensionsExplorer.module.scss';
import { IExtensionsExplorerProps } from './IExtensionsExplorerProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {SchemaExtension} from '@microsoft/microsoft-graph-types';
import {useContext, useEffect, useState} from "react";
import {PrimaryButton, Spinner} from '@fluentui/react';
import {ExtensionItemViewer, ExtensionsList} from "../";
import {Logger, LogLevel} from "@pnp/logging";

const LOG_SOURCE: string = 'ExtensionsExplorer';

export const ExtensionsExplorer: React.FunctionComponent<IExtensionsExplorerProps> = (props) => {

  const [extensionsAvailable, setExtensionsAvailable] = useState<SchemaExtension[]>(new Array<SchemaExtension>());
  const [selectedItem, setSelectedItem] = useState<SchemaExtension>(null);
  const {customSchemaService} = props;

  useEffect(() => {
    Logger.write(`[${LOG_SOURCE}] useEffect()`);
    (async () => {
      const schemas = await customSchemaService.top(15).get();
      setExtensionsAvailable(schemas);
      setSelectedItem(schemas[0]);
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
      <div className={styles.row}>
        <div className={styles.itemsListCol}>
          {extensionsAvailable && extensionsAvailable.length ?
            <ExtensionsList
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              items={extensionsAvailable} /> :
            <Spinner label="Seriously, still loading..." ariaLive="assertive" labelPosition="top" />}
          <PrimaryButton onClick={nextButtonClickHandler}>Next</PrimaryButton>
        </div>
        <div className={styles.itemViewerCol}>
          {selectedItem ? <ExtensionItemViewer schemaExtension={selectedItem} /> : 'empty'}
        </div>
      </div>
    </div>
  );
};
