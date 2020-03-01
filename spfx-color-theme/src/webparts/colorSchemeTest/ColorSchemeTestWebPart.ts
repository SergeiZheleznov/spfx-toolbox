import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ColorSchemeTestWebPartStrings';
import ColorSchemeTest from './components/ColorSchemeTest';
import { IColorSchemeTestProps } from './components/IColorSchemeTestProps';

export interface IColorSchemeTestWebPartProps {
  description: string;
}

export default class ColorSchemeTestWebPart extends BaseClientSideWebPart<IColorSchemeTestWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IColorSchemeTestProps > = React.createElement(
      ColorSchemeTest,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
