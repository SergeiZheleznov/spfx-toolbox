import * as React from 'react';
import styles from './ExtensionsExplorer.module.scss';
import { IExtensionsExplorerProps } from './IExtensionsExplorerProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {SchemaExtension} from '@microsoft/microsoft-graph-types';
import {useEffect, useState} from "react";
import {PrimaryButton, Spinner, Modal} from '@fluentui/react';
import {useBoolean} from '@uifabric/react-hooks';
import {ExtensionItemViewer, ExtensionsList} from "../";
import {Logger} from "@pnp/logging";

const LOG_SOURCE: string = 'ExtensionsExplorer';

export const ExtensionsExplorer: React.FunctionComponent<IExtensionsExplorerProps> = (props) => {

  const [extensionsAvailable, setExtensionsAvailable] = useState<SchemaExtension[]>(new Array<SchemaExtension>());
  const [selectedItem, setSelectedItem] = useState<SchemaExtension>(null);
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
  const {customSchemaService} = props;

  useEffect(() => {
    (async () => {
      Logger.write(`[${LOG_SOURCE}] retrieving custom schema extensions`);
      try {
        const schemas = await customSchemaService.top(15).get();
        setExtensionsAvailable(schemas);
      } catch (e) {
        Logger.error(e);
      }
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

  const onItemSelected = (schemaExtension: SchemaExtension) => {
    setSelectedItem(schemaExtension);
    showModal();
  };

  return(
    <div className={styles.extensionsExplorer}>

      {extensionsAvailable && extensionsAvailable.length ?
        <ExtensionsList
          selectedItem={selectedItem}
          onItemSelected={onItemSelected}
          items={extensionsAvailable} /> :
        <Spinner label="Seriously, still loading..." ariaLive="assertive" labelPosition="top" />
      }
      <PrimaryButton onClick={nextButtonClickHandler}>Next</PrimaryButton>

      <Modal
        isOpen={isModalOpen}
        onDismiss={hideModal}
        isBlocking={false}
      >
        {selectedItem ? <div style={{maxWidth: 750, padding: 15, minWidth:450}} className={styles.modal}>
          <ExtensionItemViewer schemaExtension={selectedItem} />
        </div> : 'empty'}
      </Modal>
    </div>
  );
};
