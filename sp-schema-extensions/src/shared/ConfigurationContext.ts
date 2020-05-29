import * as React from 'react';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

export interface IConfigurationContext {
  themeVariant: IReadonlyTheme;
}

export const ConfigurationContext = React.createContext<IConfigurationContext>(null);
export const ConfigurationProvider = ConfigurationContext.Provider;
