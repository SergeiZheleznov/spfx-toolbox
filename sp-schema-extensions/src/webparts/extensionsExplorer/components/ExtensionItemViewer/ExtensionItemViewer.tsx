import * as React from 'react';
import {IExtensionItemViewerProps} from "./IExtensionItemViewerProps";
import {TextField} from '@fluentui/react';

export const ExtensionItemViewer: React.FunctionComponent<IExtensionItemViewerProps> = (props) => {
  const {schemaExtension} = props;
  return (
    <div>
      {schemaExtension.id} = {schemaExtension.status}
      <TextField value={JSON.stringify(schemaExtension)} multiline rows={25} />
    </div>
  );
};
