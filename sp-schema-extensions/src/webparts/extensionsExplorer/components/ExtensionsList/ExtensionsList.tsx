import * as React from 'react';
import {IExtensionsListProps} from "./IExtensionsListProps";
import {ExtensionsListItem} from "..";
import styles from './ExtensionsList.module.scss';

export const ExtensionsList: React.FunctionComponent<IExtensionsListProps> = (props) => {
  const {items, onItemSelected, selectedItem} = props;
  const onItemSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const schemaId: string = event.currentTarget.dataset['schema'];
    const selectedSchema = items.filter(el => el.id === schemaId)[0];

    if (selectedSchema){
      onItemSelected(selectedSchema);
    }
  };

  return(
    <div className={styles.extensionsList}>
      <div className={styles.row}>
        {items.map((schemaExtension)=>(
          <ExtensionsListItem
            active={selectedItem && schemaExtension.id === selectedItem.id }
            schemaExtension={schemaExtension}
            onItemSelect={onItemSelect} />
        ))}
      </div>
    </div>
  );
};
