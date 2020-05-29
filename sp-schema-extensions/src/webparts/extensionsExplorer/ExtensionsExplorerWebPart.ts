import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { MSGraphClient } from '@microsoft/sp-http';
import {
  Logger,
  ConsoleListener,
  LogLevel
} from "@pnp/logging";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { ThemeProvider, ThemeChangedEventArgs, IReadonlyTheme } from '@microsoft/sp-component-base';
import * as strings from 'ExtensionsExplorerWebPartStrings';
import {ExtensionsExplorer, IExtensionsExplorerProps} from './components';
import {CustomSchemaService} from "../../shared/services";
import {ConfigurationProvider} from "../../shared/ConfigurationContext";

export interface IExtensionsExplorerWebPartProps {
  description: string;
}

Logger.subscribe(new ConsoleListener());
Logger.activeLogLevel = LogLevel.Info;
const LOG_SOURCE: string = 'ExtensionsExplorerWebPart';

export default class ExtensionsExplorerWebPart extends BaseClientSideWebPart <IExtensionsExplorerWebPartProps> {

  private graphClient: MSGraphClient;
  private themeProvider: ThemeProvider;
  private themeVariant: IReadonlyTheme | undefined;

  public async onInit(): Promise<void> {
    Logger.write(`[${LOG_SOURCE}] onInit()`);
    this.themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
    this.themeVariant = this.themeProvider.tryGetTheme();
    this.themeProvider.themeChangedEvent.add(this, (args: ThemeChangedEventArgs) => {
      this.themeVariant = args.theme;
      this.render();
    });

    try {
      this.graphClient = await this.context.msGraphClientFactory.getClient();
    } catch (error) {
      Logger.writeJSON(error, LogLevel.Error);
    }
  }

  public render(): void {
    const customSchemaService = new CustomSchemaService(this.graphClient, this.manifest.id);
    const element: React.ReactElement<IExtensionsExplorerProps> = React.createElement(
      ExtensionsExplorer,
      {
        customSchemaService
      }
    );

    const contextWrapper = React.createElement(
      ConfigurationProvider,
      {
        value: {
          themeVariant: this.themeVariant,
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
