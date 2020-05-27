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

import * as strings from 'ExtensionsExplorerWebPartStrings';
import {ExtensionsExplorer} from './components/ExtensionsExplorer';
import { IExtensionsExplorerProps } from './components/IExtensionsExplorerProps';

export interface IExtensionsExplorerWebPartProps {
  description: string;
}

Logger.subscribe(new ConsoleListener());
Logger.activeLogLevel = LogLevel.Info;
const LOG_SOURCE: string = 'FeedbackFormWebPart';

export default class ExtensionsExplorerWebPart extends BaseClientSideWebPart <IExtensionsExplorerWebPartProps> {

  private graphClient: MSGraphClient;

  public async onInit(): Promise<void> {
    Logger.write(`[${LOG_SOURCE}] onInit()`);
    try {
      Logger.write(`[${LOG_SOURCE}] trying to retrieve graphClient`);
      this.graphClient = await this.context.msGraphClientFactory.getClient();
    } catch (error) {
      Logger.writeJSON(error, LogLevel.Error);
    }
  }

  public render(): void {
    const element: React.ReactElement<IExtensionsExplorerProps> = React.createElement(
      ExtensionsExplorer,
      {
        graphClient: this.graphClient
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
