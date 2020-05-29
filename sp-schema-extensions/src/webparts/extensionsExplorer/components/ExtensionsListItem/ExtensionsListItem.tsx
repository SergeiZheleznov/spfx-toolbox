import * as React from 'react';
import {IExtensionsListItemProps} from "./IExtensionsListItemProps";
import {ActionButton, Stack} from '@fluentui/react';
import styles from './ExtensionsListItem.module.scss';
import {useContext, useEffect} from "react";
import {ConfigurationContext} from "../../../../shared/ConfigurationContext";
import {IReadonlyTheme} from "@microsoft/sp-component-base";

export const ExtensionsListItem: React.FunctionComponent<IExtensionsListItemProps> = (props) => {
  const config = useContext(ConfigurationContext);
  const {semanticColors}: IReadonlyTheme = config.themeVariant;
  const {schemaExtension, active} = props;

  return(
    <Stack horizontal horizontalAlign={'space-between'} className={styles.listItem} style={{
      borderColor: semanticColors.bodyDivider,
    }}>
      <Stack.Item align={'center'}>
        {schemaExtension.id}
      </Stack.Item>
      <Stack.Item>
        <ActionButton data-schema={schemaExtension.id} onClick={props.onItemSelect} iconProps={{iconName: active ? 'RadioBtnOn' : 'ChevronRight'}} />
      </Stack.Item>
    </Stack>
  );
};
