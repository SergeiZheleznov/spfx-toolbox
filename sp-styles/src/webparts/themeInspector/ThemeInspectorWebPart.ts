import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { ThemeProvider, ThemeChangedEventArgs, IReadonlyTheme } from '@microsoft/sp-component-base';
import * as strings from 'ThemeInspectorWebPartStrings';
import {ThemeInspector} from './components/ThemeInspector';
import { IThemeInspectorProps } from './components/IThemeInspectorProps';
import {ConfigurationProvider} from "../shared/ConfigurationContext";

export interface IThemeInspectorWebPartProps {
  description: string;
}

export default class ThemeInspectorWebPart extends BaseClientSideWebPart <IThemeInspectorWebPartProps> {

  private themeProvider: ThemeProvider;
  private themeVariant: IReadonlyTheme | undefined;

  public async onInit(): Promise<void> {
    this.themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
    this.themeVariant = this.themeProvider.tryGetTheme();
    this.themeProvider.themeChangedEvent.add(this, (args: ThemeChangedEventArgs) => {
      this.themeVariant = args.theme;
      this.render();
    });
  }

  public render(): void {

    const {themeVariant} = this;

    const element: React.ReactElement<IThemeInspectorProps> = React.createElement(
      ThemeInspector,
      {
        description: this.properties.description
      }
    );

    const contextWrapper = React.createElement(
      ConfigurationProvider,
      {
        value: {
          themeVariant,
        },
        children: element
      }
    );

    ReactDom.render(contextWrapper, this.domElement);
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
