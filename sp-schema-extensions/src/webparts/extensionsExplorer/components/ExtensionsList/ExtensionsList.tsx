import * as React from 'react';
import {IExtensionsListProps} from "./IExtensionsListProps";
import {ExtensionsListItem} from "..";

export const ExtensionsList: React.FunctionComponent<IExtensionsListProps> = (props) => {
  const {items, setSelectedItem, selectedItem} = props;

  const onItemSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    const schemaId: string = event.currentTarget.dataset['schema'];
    const selectedSchema = items.filter(el => el.id === schemaId)[0];

    if (selectedSchema){
      setSelectedItem(selectedSchema);
    }
  };

  return(
    <div>
      {items.map((schemaExtension)=>(
        <ExtensionsListItem
          active={selectedItem && schemaExtension.id === selectedItem.id }
          schemaExtension={schemaExtension}
          onItemSelect={onItemSelect} />
      ))}
    </div>
  );
};
