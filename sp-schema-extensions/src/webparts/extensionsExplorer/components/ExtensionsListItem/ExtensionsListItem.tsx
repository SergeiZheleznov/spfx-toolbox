import * as React from 'react';
import {IExtensionsListItemProps} from "./IExtensionsListItemProps";
import {ActionButton, Stack} from '@fluentui/react';
import styles from './ExtensionsListItem.module.scss';
import {useEffect} from "react";

export const ExtensionsListItem: React.FunctionComponent<IExtensionsListItemProps> = (props) => {
  const {schemaExtension} = props;

  return(
    <Stack horizontal horizontalAlign={'space-between'} className={styles.listItem}>
      <Stack.Item align={'center'}>
        {schemaExtension.id}
      </Stack.Item>
      <Stack.Item>
        <ActionButton data-schema={schemaExtension.id} onClick={props.onItemSelect} iconProps={{iconName: 'ChevronRight'}} />
      </Stack.Item>
    </Stack>
  );
};
