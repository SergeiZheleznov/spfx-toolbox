import * as React from 'react';
import styles from './ThemeInspector.module.scss';
import { IThemeInspectorProps } from './IThemeInspectorProps';
import {useContext} from "react";
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import {ConfigurationContext} from "../../shared/ConfigurationContext";

export const ThemeInspector: React.FunctionComponent<IThemeInspectorProps> = (props) => {
  const config = useContext(ConfigurationContext);
  const {semanticColors}: IReadonlyTheme = config.themeVariant;
    return (
      <div className={ styles.themeInspector }>
        {JSON.stringify(semanticColors)}
      </div>
    );
};
