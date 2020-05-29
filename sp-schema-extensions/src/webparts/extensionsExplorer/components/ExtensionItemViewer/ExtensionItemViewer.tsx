import * as React from 'react';
import {IExtensionItemViewerProps} from "./IExtensionItemViewerProps";
import {TextField, Stack, Icon} from '@fluentui/react';
import styles from './ExtensionItemViewer.module.scss';

export const ExtensionItemViewer: React.FunctionComponent<IExtensionItemViewerProps> = (props) => {
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
        {schemaExtension.targetTypes.map(t => (<span>{t}</span>))}
      </div>
      <p className={styles.extDescription}>{schemaExtension.description}</p>
      <TextField value={JSON.stringify(schemaExtension.properties)} multiline rows={10} />
    </div>
  );
};
