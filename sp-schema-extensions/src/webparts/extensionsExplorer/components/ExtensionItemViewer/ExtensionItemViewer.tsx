import * as React from 'react';
import {IExtensionItemViewerProps} from "./IExtensionItemViewerProps";
import {TextField, Stack, Icon} from '@fluentui/react';
import styles from './ExtensionItemViewer.module.scss';
import {useContext} from "react";
import {ConfigurationContext} from "../../../../shared/ConfigurationContext";
import {IReadonlyTheme} from "@microsoft/sp-component-base";

export const ExtensionItemViewer: React.FunctionComponent<IExtensionItemViewerProps> = (props) => {
  const config = useContext(ConfigurationContext);
  const {semanticColors}: IReadonlyTheme = config.themeVariant;
  const {schemaExtension} = props;
  return (
    <div className={styles.extensionItemViewer}>
      <Stack horizontal horizontalAlign={'space-between'}>
        <Stack.Item>
          <h1 className={styles.extId}>
            {schemaExtension.id}
            <sup>
              <Icon title={schemaExtension.status} style={{color: schemaExtension.status == 'Available' ? 'green' : 'red'}} iconName={'CircleFill'} />
            </sup>
          </h1>
        </Stack.Item>
        <Stack.Item align={'center'}>

        </Stack.Item>
      </Stack>
      <div className={styles.extTargetTypes}>
        {schemaExtension.targetTypes.map(t => (<span style={{
          backgroundColor: semanticColors.primaryButtonBackground,
          color: semanticColors.primaryButtonText
        }}>{t}</span>))}
      </div>
      <p className={styles.extDescription}>{schemaExtension.description}</p>

      <div className={styles.extProperties}>
        {schemaExtension.properties.map(p=>(
          <div style={{
            backgroundColor: semanticColors.accentButtonBackground,
            color: semanticColors.accentButtonText
          }} className={styles.propertyItem}>
            <span className={styles.name}>{p.name}</span><span className={styles.type}>: {p.type}</span>
          </div>))}
      </div>
    </div>
  );
};
