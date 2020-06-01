import * as React from 'react';
import {IExtensionsListItemProps} from "./IExtensionsListItemProps";
import {ActionButton, Text, Stack} from '@fluentui/react';
import styles from './ExtensionsListItem.module.scss';
import {useContext} from "react";
import {ConfigurationContext, stringToColour} from "../../../../shared";
import {IReadonlyTheme} from "@microsoft/sp-component-base";

export const ExtensionsListItem: React.FunctionComponent<IExtensionsListItemProps> = (props) => {
  const config = useContext(ConfigurationContext);
  const {semanticColors}: IReadonlyTheme = config.themeVariant;
  const {schemaExtension, active} = props;

  return(
    <div className={styles.item}>
      <div className={styles.body} style={{
        borderColor: stringToColour(schemaExtension.owner)
      }}>
        <div className={styles.info}>
          <Text className={styles.name} nowrap={true} block={true}>{schemaExtension.id}</Text>
          <Text className={styles.description} nowrap={true} block={true} style={{
            color: semanticColors.bodySubtext
          }}>
            {schemaExtension.description ? schemaExtension.description : '—'}
          </Text>
          <div className={styles.extTargetTypes}>
            {schemaExtension.targetTypes.map(t => (<span style={{
              backgroundColor: semanticColors.disabledBackground,
              color: semanticColors.disabledText
            }}>{t}</span>))}
          </div>
        </div>
        <Stack horizontal horizontalAlign={'space-between'}>
          <Stack.Item>
            <ActionButton disabled iconProps={{iconName: 'AllApps'}}>{schemaExtension.properties.length}</ActionButton>
          </Stack.Item>
          <Stack.Item>
            <ActionButton data-schema={schemaExtension.id} onClick={props.onItemSelect} iconProps={{iconName: active ? 'RadioBtnOn' : 'RedEye'}} />
          </Stack.Item>
        </Stack>
      </div>
    </div>
  );
};
