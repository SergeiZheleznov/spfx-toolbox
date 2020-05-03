import * as React from 'react';
import styles from './ThemeInspector.module.scss';
import { IThemeInspectorProps } from './IThemeInspectorProps';

export const ThemeInspector: React.FunctionComponent<IThemeInspectorProps> = (props) => {
    return (
      <div className={ styles.themeInspector }>
        themeInspector
      </div>
    );
}
